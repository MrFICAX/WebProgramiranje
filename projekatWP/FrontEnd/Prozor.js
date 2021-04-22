import { Klub } from "./klub.js";
import { Takmicar } from "./takmicar.js";
import { Takmicenje } from "./takmicenje.js"

// const t = new Takmicenje(1);
// t.drawForm(document.body);

export class Prozor {

    constructor() {
        this.listaTakmicenja = [];
        this.trenutnoTakmicenje = null;
    }
    dodajTakmicenje(takmicenje) {
        this.listaTakmicenja.push(takmicenje);
        this.crtajOpcije(takmicenje);
    }

    crtajMain() {
        let naslov = document.createElement("div");
        naslov.className = "configurator";
        naslov.classList.add("naslov");
        document.body.appendChild(naslov);

        let tekstNaslova = document.createElement("h1");
        tekstNaslova.innerHTML = "SOFTVER ZA ORGANIZACIJU TURNIRA";
        naslov.appendChild(tekstNaslova);


        let divIzborTakmicenja = document.createElement("div");
        //divIzborTakmicenja.className = "divIzborTakmicenja";
        divIzborTakmicenja.classList.add("divIzborTakmicenja");
        document.body.appendChild(divIzborTakmicenja);

        let divIzbor1 = document.createElement("div");
        divIzbor1.classList.add("elementiZaIzbor");
        divIzborTakmicenja.appendChild(divIzbor1);

        let izbor = document.createElement("div");
        izbor.className = "izbor";
        divIzbor1.appendChild(izbor);

        let pom = document.createElement("button");
        pom.innerHTML = "Otvorite izabrano takmicenje";
        pom.className = "dugme";
        pom.onclick = (ev) => {
            this.ObrisiPostojeceTakmicenje();

            let id = parseInt(document.getElementsByClassName("selekcija")[0].value);
            const NadjenoTakmicenje = this.listaTakmicenja.find(element => element.id == id);
            NadjenoTakmicenje.drawForm(document.body);
            NadjenoTakmicenje.crtajSveKlubove();
            this.trenutnoTakmicenje = NadjenoTakmicenje;
        }
        divIzbor1.appendChild(pom);

        let izaberiTakmicenje = document.createElement("select");
        izaberiTakmicenje.className = "selekcija";
        let labela = document.createElement("label");
        labela.innerHTML = "Izaberi takmicenje:"
        izbor.appendChild(labela);
        izbor.appendChild(izaberiTakmicenje);

        divIzbor1.appendChild(izbor);

        pom = document.createElement("button");
        pom.innerHTML = "Obrisite izabrano takmicenje";
        pom.className = "dugme";
        pom.onclick = (ev) => {

            //------------------------RIZICAN DEO KODA
            let id = parseInt(document.getElementsByClassName("selekcija")[0].value);
            const NadjenoTakmicenje = this.listaTakmicenja.find(element => element.id == id);
            NadjenoTakmicenje.obrisiTakmicenjeFetch();
            if (this.trenutnoTakmicenje === NadjenoTakmicenje) {
                this.ObrisiPostojeceTakmicenje();
            }
            this.listaTakmicenja = this.listaTakmicenja.filter(function(el) { return el.id != NadjenoTakmicenje.id; }); 
            this.obrisiOpciju(id);
            console.log(this.listaTakmicenja);
        }
        divIzbor1.appendChild(pom);


        let divDodaj = document.createElement("div");
        divDodaj.classList.add("elementiZaIzbor");
        divIzborTakmicenja.appendChild(divDodaj);

        pom = document.createElement("label");
        pom.innerHTML = "Unesite ime novog takmicenja:";
        pom.className = "unos";
        divDodaj.appendChild(pom);

        pom = document.createElement("input");
        pom.type = "text";
        pom.name = "names";
        pom.className = "unos names novoTakmicenje";
        divDodaj.appendChild(pom);

        pom = document.createElement("button");
        pom.innerHTML = "Unesite takmicenje u sistem";
        pom.className = "dugme";
        pom.onclick = (ev) => {
            if (!this.validirajIme(divDodaj)) {
                alert("Niste uneli nijedan karakter!");
                return;
            }
            let imeTakmicenja = divDodaj.getElementsByClassName("names")[0].value;
            let indeks = parseInt([this.listaTakmicenja[this.listaTakmicenja.length - 1].id]) + 1;

            var novo = new Takmicenje(indeks, imeTakmicenja);
            novo.dodajTakmicenjeFetch(this); //ovoj metodi prosledjujemo this, da bi se u then() odradile metode zavisne od Fetch-a
            //Metode koje se izvrsavaju u dodajTakmicenjeFetch metodi
            //this.dodajTakmicenje(novo);
        }
        divDodaj.appendChild(pom);

    }
    validirajIme(divDodaj) {
        if (divDodaj.getElementsByClassName("names")[0].value == "")
            return false;
        else
            return true;
    }
    ObrisiPostojeceTakmicenje() {
        var element = document.body.getElementsByClassName("maincontainer")[0];
        if (element !== undefined)
            element.remove();
    }
    crtajOpcije(takmicenje) {
        let opcija;
        let element = document.getElementsByClassName("selekcija")[0];

        opcija = document.createElement("option");
        opcija.innerHTML = takmicenje.ime;
        opcija.classList.add("opcija");
        opcija.classList.add(takmicenje.id);
        opcija.value = takmicenje.id;
        element.appendChild(opcija);
    }
    obrisiOpciju(id) {
        let element = document.getElementsByClassName("selekcija")[0];
        let opcija = element.getElementsByClassName(id)[0]; //OVDE OBAVEZNO TRAZITI PREKO SELEKTOVANOG ID-ja
        element.removeChild(opcija);
    }
    OcistiImeTakmicenja() {
        document.getElementsByClassName("novoTakmicenje")[0].value = "";
    }

}
