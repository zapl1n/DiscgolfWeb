const bcrypt = require("bcrypt");

const password = "maeiteamidasiiapanna"
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
        console.error("Viga parooli krüpteerimisel:", err);
        return;
    }
    console.log("Krüpteeritud parool:", hashedPassword);
});