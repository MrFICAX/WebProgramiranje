import { Klub } from "./klub.js"

export class Takmicenje {

    constructor(id, ime) {
        this.id = id;
        this.ime = ime;
        this.broj = 0;
        this.klubovi = [];
        this.container = null;
    }

    drawForm(host) {
        this.container = document.createElement("div");
        this.container.classList.add("maincontainer");
        this.container.classList.add(this.id);
        host.appendChild(this.container);

        let div = document.createElement("div");
        div.classList.add("configurator");
        this.container.appendChild(div);

        let pom = document.createElement("h1");
        pom.innerHTML = "Ime takmicenja: " + this.ime;
        div.appendChild(pom);

        let Udiv = document.createElement("div");
        Udiv.classList.add("Udiv");
        div.appendChild(Udiv);



        let UdivLabela = document.createElement("label");
        UdivLabela.innerHTML = "Ukupno prijavljeno klubova: " + this.broj;
        UdivLabela.className = "brojKlubova";
        div.appendChild(UdivLabela);

        pom = document.createElement("label");
        pom.innerHTML = "Unesite ime kluba:";
        pom.className = "unos";
        Udiv.appendChild(pom);

        pom = document.createElement("input");
        pom.type = "text";
        pom.name = "names";
        pom.classList.add("unos", "names", "noviKlub");
        Udiv.appendChild(pom);

        pom = document.createElement("button");
        pom.innerHTML = "Unesite klub u sistem";
        pom.className = "unos dugme";
        pom.onclick = (ev) => {
            var textBox = document.getElementsByClassName("noviKlub")[0];
            if (!this.obradiKlub(textBox.value)) {
                return;
            }
            console.log("Klubovi nakon dodavanja novog preko kontrola!");
            this.logujUKonzoluKlubove();
            this.OcistiImeKluba();
        }
        Udiv.appendChild(pom);

        pom = document.createElement("button");
        pom.innerHTML = "Obrisi klub iz sistema";
        pom.className = "unos dugme disabled obrisiKlub";
        pom.onclick = (ev) => {
            var textBox = document.getElementsByClassName("noviKlub")[0];
            this.obrisiKlub(textBox.value);
        }
        Udiv.appendChild(pom);

        console.log(this);
    }
    dodajTakmicenjeFetch(takmicenje) {

        fetch("https://localhost:5001/Takmicenje/PostTakmicenje/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ime: this.ime
            })
        }).then(p => {
            if (p.ok) {
                p.json().then(q => {
                    this.id = q.id;
                    takmicenje.dodajTakmicenje(this);
                    console.log(takmicenje.listaTakmicenja);
                    takmicenje.OcistiImeTakmicenja();
                });
            }
            else if (p.status == 501) {
                alert("Greska na serverskoj strani!");
            }
        }).catch(p => {
            alert("Error");
        });
    }
    obrisiTakmicenjeFetch() {

        fetch("https://localhost:5001/Takmicenje/DeleteTakmicenje/" + this.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.id,
                ime: this.ime
            })
        });
    }
    dodajKlub(Imekluba) {

        if (this.klubovi.some(el => el.ime === Imekluba)) {
            alert("Klub sa ovim imenom vec postoji!");
            return false;
        }
        this.FetchGetKlub(Imekluba);
        return true;
    }
    FetchGetKlub(ImeKluba){
        let klub = new Klub(undefined, this.id, ImeKluba, undefined);
        klub.Fetch(this);
    }
    dodajObjekatKlub(Klub) {
        this.klubovi.push(Klub);
    }
    obradiKlub(a) { //crtanje i dodavanje novog kluba kroz kontrole
        if (!a) {
            alert("Unesite ime kluba!");
            return false;
        }

        if (this.broj === 0)
            this.PromeniDugmeIzbrisi();

        var povratniBool = this.dodajKlub(a);
        if (!povratniBool) {
            return false;
        }
        return true;
    }
    azurirajBrojKlubova() {
        this.broj = this.klubovi.length;
        let element = document.getElementsByClassName("brojKlubova")[0];
        element.innerHTML = "Ukupno prijavljeno klubova: " + this.broj;
    }
    crtajSveKlubove() {
        // this.klubovi.forEach(element => element.crtajKlub(this.container));
        for (let i = 0; i < this.klubovi.length; i++) {
            this.klubovi[i].crtajKlub(this.container);
        };
        this.azurirajBrojKlubova();
        if (this.broj !== 0)
            this.PromeniDugmeIzbrisi();
        console.log("Klubovi nakon crtanja svih klubova dobijenih iz baze ");
        this.logujUKonzoluKlubove();
    }
    logujUKonzoluKlubove() {
        console.log(this.klubovi);
    }

    obrisiKlub(a) {

        let pom = document.getElementsByClassName("container"); //CEO DIV ELEMENT KOJI PREDSTAVLJA KLUB
        if (pom[0] == null) {
            alert("Ne postoji nijedan klub u bazi za ovo takmicenje!");
            return;
        }

        if (!a) {
            alert("Unesite ime kluba!");
            return;
        }

        var Klub = this.klubovi.find(element => element.ime == a);
        if (Klub !== undefined) {

            for (let i = 0; i < pom.length; i++) {
                let hElement = pom[i].getElementsByClassName("imeKluba");
                let string = hElement[0].innerHTML;
                if (string.includes(a)) {
                    pom[i].remove();
                }
            }

            Klub.ObrisiSaFetch();
            this.klubovi = this.klubovi.filter(klub => klub.ime != a);
            this.azurirajBrojKlubova();
            this.OcistiImeKluba();
            if (this.broj == 0)
                this.PromeniDugmeIzbrisi();

            console.log("Klubovi nakon brisanja: ");
            this.logujUKonzoluKlubove();
        }
        else {
            alert("Ne postoji klub sa ovim nazivom!");
        }
    }
    PromeniDugmeIzbrisi() {
        var dobijenoDugme = document.getElementsByClassName("obrisiKlub")[0];
        if (dobijenoDugme.classList.contains("disabled"))
            dobijenoDugme.classList.remove("disabled");
        else
            dobijenoDugme.classList.add("disabled");

    }
    OcistiImeKluba() {
        document.getElementsByClassName("noviKlub")[0].value = "";
    }
}