const verifyEmailTemplate = ({name,url}) => {
    return `
    <p>Dear ${name}</p>
    <p>Thank you for registering Quick Commerce</p>
    <a href=${url} style="color: white; background-color: blue; margin: 10px">
        Verify Email
    </a>
    `
}

export default verifyEmailTemplate