import { Klub } from "./klub.js";
import { Takmicar } from "./takmicar.js";
import { Takmicenje } from "./takmicenje.js"

// const t = new Takmicenje(1);
// t.drawForm(document.body);

fetch("https://localhost:5001/Takmicenje/GetTakmicenje").then(p => {
    p.json().then(data => {
        data.forEach(takmicenje => {
            const rest1 = new Takmicenje(takmicenje.id);
            takmicenje.klubovi.forEach(klub => {
                var Noviklub = new Klub(takmicenje.id, klub.ime, klub.datum_prijave);
                rest1.dodajObjekatKlub(Noviklub);
                klub.takmicari.forEach(takmicari =>{
                    var NoviTakmicar = new Takmicar( takmicari.ime, takmicari.prezime, takmicari.kilaza, takmicari.kategorija, klub.ime);
                    Noviklub.dodajTakmicara(NoviTakmicar);
                })
            })
            rest1.drawForm(document.body);
            rest1.crtajSveKlubove();
        });
    });
});