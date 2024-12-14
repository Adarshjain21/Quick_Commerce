const forgotPasswordTempelate = ({ name, otp }) => {
  return `
    <div>
        <p>Dear, ${name}</p>
        <p>You're requested a password reset. Please use following OTP code to reset your password.</p>
        <div style= "background-color: yellow; font-size: 20px; padding: 20px; text-align: center; font-weight: 800;">
            ${otp}
        </div>
        <p>This OTP is valid for 1 minute only. Enter this otp in the Quick Commerce website to proceed with resetting your password.</p>
        <br />
        <p>Thanks</p>
        <p>Quick Commerce</p>
    </div>
    `;
};

export default forgotPasswordTempelate;
