export function comparePassword(req, res, next) {
    const { password } = req.body;
    const userPassword = res.locals.user.password;
  
    if (password !== userPassword) {
      res.status(400).json({ error: "Email or Passowrd mismatch" });
      return;
    }
  
    next();
  }