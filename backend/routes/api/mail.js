const express = require('express');
const router = express.Router();
const config = require('config');
const nodemailer = require('nodemailer');

const renderMail = (code, message = 'Good Luck with your life') => {
    return `
  <div leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="height:auto !important;width:100% !important; font-family: Helvetica,Arial,sans-serif !important; margin-bottom: 40px;">
  <center>
      <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff;border:1px solid #e4e2e2;border-collapse:separate !important; border-radius:4px;border-spacing:0;color:#242128; margin:0;padding:40px;"
          heigth="auto">
          <tbody>
              <tr>
                  <td align="left" valign="center" style="padding-bottom:40px;border-top:0;height:100% !important;width:100% !important;">
                      <img src="https://coloredstrategies.com/mailing/gogo.png" />
                  </td>
              </tr>
              <tr>
                  <td colSpan="2" style="padding-top:10px;border-top:1px solid #e4e2e2">
                      <h3 style="color:#303030; font-size:18px; line-height: 1.6; font-weight:500;">Welcome to Trambolin!</h3>
                      <p style="color:#8f8f8f; font-size: 14px; padding-bottom: 20px; line-height: 1.4;">
                            ${message}
                      </p>
                      <h3 style="color:#303030; font-size:18px; line-height: 1.6; font-weight:500;">Your
                          Code</h3>
                      <p style="background-color:#f1f1f1; padding: 8px 15px; border-radius: 50px; display: inline-block; margin-bottom:20px; font-size: 14px;  line-height: 1.4; font-family: Courier New, Courier, monospace; margin-top:0">${code}</p>

                      <h3 style="color:#303030; font-size:18px; line-height: 1.6; font-weight:500;">Steps
                          to
                          Follow</h3>
                  </td>
              </tr>
          </tbody>
      </table>
      <table style="margin-top:30px; padding-bottom:20px;; margin-bottom: 40px;">
          <tbody>
              <tr>
                  <td align="center" valign="center">
                      <p style="font-size: 12px; text-decoration: none;line-height: 1; color:#909090; margin-top:0px; margin-bottom:5px; ">
                          ColoredStrategies Inc, 35 Little Russell St. Bloomsburg London,UK
                      </p>
                      <p style="font-size: 12px; line-height:1; color:#909090;  margin-top:5px; margin-bottom:5px;">
                          <a href="#" style="color: #922c88; text-decoration:none;">Privacy
                              Policy</a>
                          | <a href="#" style="color: #922c88; text-decoration:none;">Unscubscribe</a>
                      </p>
                  </td>
              </tr>
          </tbody>
      </table>
  </center>
</div>
  `
}

// @route POST api/mail
// @desc Send email
// @access Public
router.post('/', async (req, res) => {
    const { taker, code, message, subject } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ekremtrambmail@gmail.com',
            pass: 'ekremTramb1'
        }
    });

    const mailOptions = {
        from: 'ekremtrambmail@gmail.com', // sender address
        to: taker, // list of receivers
        subject: subject ? subject : 'Example Subject', // Subject line
        html: renderMail(code, message)// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            res.send(info);
    });
});

module.exports = router;