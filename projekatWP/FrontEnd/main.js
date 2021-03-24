import { Klub } from "./klub.js";
import { Takmicar } from "./takmicar.js";
import { Takmicenje } from "./takmicenje.js"
import { Main } from "./Prozor.js"


const mejin = new Main();
mejin.crtajMain();

console.log(mejin.listaTakmicenja);

    fetch("https://localhost:5001/Takmicenje/GetTakmicenje").then(p => {
        p.json().then(data => {
            data.forEach(takmicenje => {
                const rest1 = new Takmicenje(takmicenje.id, takmicenje.ime);
                takmicenje.klubovi.forEach(klub => {
                    var Noviklub = new Klub(klub.id, klub.ime, klub.datum_prijave);
                    rest1.dodajObjekatKlub(Noviklub);
                    klub.takmicari.forEach(takmicari => {
                        var NoviTakmicar = new Takmicar(takmicari.ime, takmicari.prezime, takmicari.kilaza, takmicari.kategorija, klub.ime);
                        Noviklub.dodajTakmicara(NoviTakmicar);
                    })
                })
                mejin.dodajTakmicenje(rest1);
                // rest1.drawForm(document.body);
                // rest1.crtajSveKlubove();
            });
        });
    });


