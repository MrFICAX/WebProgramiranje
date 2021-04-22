import { Klub } from "./klub.js";
import { Takmicar } from "./takmicar.js";
import { Takmicenje } from "./takmicenje.js"
import { Prozor } from "./Prozor.js"


const mejin = new Prozor();
mejin.crtajMain();

    fetch("https://localhost:5001/Takmicenje/GetTakmicenje").then(p => {
        if(p.ok){
            console.log(p);
            p.json().then(data => {
                data.forEach(takmicenje => {
                    const rest1 = new Takmicenje(takmicenje.id, takmicenje.ime);
                    takmicenje.klubovi.forEach(klub => {
                        var Noviklub = new Klub(klub.id, takmicenje.id, klub.ime, klub.datum_prijave);
                        rest1.dodajObjekatKlub(Noviklub);
                        klub.takmicari.forEach(takmicari => {
                            var NoviTakmicar = new Takmicar(takmicari.ime, takmicari.prezime, takmicari.kilaza, takmicari.kategorija, klub.ime, klub.id, takmicari.id);
                            Noviklub.dodajTakmicara(NoviTakmicar);
                        })
                    })
                    mejin.dodajTakmicenje(rest1);
                });
            });
        }
        else
            alert("Fetch Get Takmicenje nije pribavilo podatke!");
    }).catch(e => alert(e));


