const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(express.json());

// 🌍 permite GitHub acessar API
app.use(cors({
    origin: "https://loftoficial1.github.io/valquiria-clan/"
}));

const MEMBERS_FILE = "./members.json";

// =====================
// MEMBERS API
// =====================

// GET
app.get("/members", (req, res) => {
    res.json(JSON.parse(fs.readFileSync(MEMBERS_FILE)));
});

// POST
app.post("/members", (req, res) => {
    const data = JSON.parse(fs.readFileSync(MEMBERS_FILE));

    data.push({
        id: Date.now(),
        nick: req.body.nick,
        cargo: req.body.cargo
    });

    fs.writeFileSync(MEMBERS_FILE, JSON.stringify(data, null, 2));

    res.json({ ok: true });
});

// DELETE
app.delete("/members/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(MEMBERS_FILE));

    data = data.filter(m => m.id != req.params.id);

    fs.writeFileSync(MEMBERS_FILE, JSON.stringify(data, null, 2));

    res.json({ ok: true });
});

app.listen(3000, () => {
    console.log("API rodando em http://localhost:3000");
});