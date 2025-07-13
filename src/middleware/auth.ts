import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  //apply only to admin
  if (req.path.startsWith('/admin')) {
    const user = req.user;
    
    if (user?.role?.name === "ADMIN") {
      next();
    } else res.render("status/403.ejs");
    
    return;
  }
  
  //client routes
  next();
};
