const { accounts } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// module.exports = {
//   addAccount: async(req, res, next) => {
//     try {
//       const checkUser = await accounts.findOne({
//         where: {username: req.body.username}
//       })
//       if (checkUser) {
//         throw {
//           codeStatus: 400,
//           success: false,
//           message: "Account already exist"
//         }
//       } else {
//         const result = await accounts.create(req.body);
//         return res.status(201).send(result);
//       }
//     } catch (err) {
//       console.log(err);
//       return res.status(err.codeStatus || 500).send(err)
//     }
//   },
//   getAccount: async(req, res, next) => {
    // try {
    //   const result = await accounts.findAll({
    //     where: req.query,
    //     attributes: {exclude: ["createdAt", "updatedAt"]},
    //     order: [["id", "DESC"]]
    //   });
    //   return res.status(200).send(result)
    // } catch (err) {
    //   console.log(err);
    //   return res.status(500).send(err)
    // }
//   },
  // updateAccount: async(req, res, next) => {
  //   try {
  //     const result = await accounts.update({
  //       username: req.body.username,
  //       password: req.body.password,
  //     }, {
  //       where: {
  //         id:req.params.id
  //       }
  //     }
  //   )
  //   return res.status(200).send({
  //     success: true,
  //     message: "Update success"
  //   });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).send(err);
  //   }
  // },
//   deleteAccount: async(req, res, next) => {
//     try {
//       const result = await accounts.destroy({
//         where: {
//           id: req.params.id,
//         },
//       });
//       return res.status(200).send({
//         success: true,
//         message: "Delete success"
//       })
//     } catch (err) {
//       console.log(err);
//       return res.status(500).send(err)
//     }
//   },
// }

module.exports = {
  getData: async (req, res, next) => {
    try {
      const result = await accounts.findAll();
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  },
  register: async (req, res, next) => {
    try {
      console.log("Check data from client", req.body);
      // Lanjut registrasi
      const isExist = await accounts.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (isExist) {
        return res.status(400).send({
          success: false,
          message: "Account is exist",
        });
      }
      delete req.body.confirmPassword;

      // HASH PASSWORD
      const salt = await bcrypt.genSalt(10);
      console.log("ini salt", salt);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      console.log("ini hash", hashPassword);
      req.body.password = hashPassword;

      await accounts.create(req.body);

      return res.status(201).send({
        success: true,
        message: "Register success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await accounts.findOne({
        where: {
          email: req.body.email,
        },
        raw: true,
      });
      // Fungsi bcrypt compare
      const isValid = await bcrypt.compare(req.body.password, result.password);

      if (isValid === true) {
        // delete result.password; // delete agar tidak terkirim ke front end passwordnya
        // GENERATE TOKEN
        const {id, username, email, phone, role, isVerified} = result;
        const token = jwt.sign({
          id,
          role,
          isVerified,
        }, process.env.SCRT_TKN, {
          expiresIn:"1h"
        });
        // console.log("ini token login", token);
        // const verifyData = jwt.verify(token, process.env.SCRT_TKN);
        // console.log("ini verify data token", verifyData);
        return res.status(200).send({
          success: true,
          result: {
            username,
            email,
            phone,
            isVerified,
            role,
            token,
          }
        });
      } else {
        return res.status(401).send({
          success: false,
          message: "You unauthenticate",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  keepLogin : async(req, res, next) => {
    try {
      console.log("keep login", req.accountData);
      // Description token
      const result = await accounts.findOne({
        where: {
          id: req.accountData.id,
        },
        raw: true,
      })
      console.log("result", result);
      const {id, username, email, phone, role, isVerified} = result;
      const token = jwt.sign({
        id,
        role,
        isVerified
      }, process.env.SCRT_TKN, {
        expiresIn: "1h",
      });
      return res.status(200).send({
        success: true,
        result: {
          username,
          email,
          phone,
          isVerified,
          token,
        }
      })
    } catch (error) {
      console.log(error);
    }
  },
  forgotPass: async (req, res, next) => {
    try {
      const accountData = await accounts.findOne({
        where: {
          email: req.body.email,
        },
        raw: true,
      });
      console.log(accountData.id);
      if (!accountData) {
        return res.status(400).send({
          success: false,
          message: "Account doesn't exist",
        });
      } else {
        const {id, username, email, phone, role, isVerified} = accountData;
        const token = jwt.sign({
          id,
          email,
        }, process.env.SCRT_TKN, {
          expiresIn: "1h",
        });
        return res.status(200).send(token)
      }
    } catch (error) {
      console.log(error);
    }
  },
  resetPass: async(req, res, next) => {
    try {
      // Check token
      let token = req.body.token;
      const accountData = jwt.verify(token, process.env.SCRT_TKN);
      if (req.body.password === req.body.confirmPassword) {
        delete req.body.confirmPassword;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        await accounts.update({
          password: req.body.password,
        }, {
          where: {
            id: accountData.id
          }
        })
        return res.status(201).send("Password updated")
      } else {
        return res.status(401).send("Password and confirm Password not same")
      }
    } catch (error) {
      console.log(error);
    }
  }
};
