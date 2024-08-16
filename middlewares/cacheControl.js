
const cacheControl=(req,res,next)=>{
    res.setHeader('Cache-control','no-store','no-cache','must-revalidate','proxy-revalidate');
    res.setHeader('Pragma','no-cache');
    res.setHeader('Expires','0');
    res.setHeader('Surrogate-Control','no-Store');
    next();
    
};

module.exports = cacheControl;