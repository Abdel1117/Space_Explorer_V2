const jwt = require("jsonwebtoken");

// Laisse passer uniquement les requêtes portant un access token valide d'un administrateur.
// Accepte "Bearer <token>" comme le token brut (useFetch côté front envoie le token sans préfixe).
module.exports = (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : header;

    if (!token) {
        return res.status(401).json({ message: "Veuillez vous connecter" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.AUTH_TOKKEN_CODE);
    } catch (err) {
        return res.status(401).json({ message: "Session invalide ou expirée, veuillez vous reconnecter" });
    }

    if (decoded.userRole !== "Admin") {
        return res.status(403).json({ message: "Action réservée aux administrateurs" });
    }

    req.user = decoded;
    return next();
};
