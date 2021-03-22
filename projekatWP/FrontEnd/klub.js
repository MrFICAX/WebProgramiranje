
import { Takmicar } from "./takmicar.js";

export class Klub {
    constructor(id, ime, datum_prijave) {
        this.id = id;
        this.ime = ime;
        this.brojT = 0;
        this.arrive_time = datum_prijave;
        this.takmicari = [];
        this.container = null;
    }
    Fetch() {
        fetch("https://localhost:5001/Takmicenje/PostKlub/" + this.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ime: this.ime,
                datum_prijave: this.arrive_time
            })
        }).then(p => {
            if (p.ok) {
                p.json().then(q => {
                    alert("Uspesno ste dodali novi klub!");
                });
            }
            else if (p.status == 406) {
                alert("Input all informations.");
            }
        }).catch(p => {
            alert("Error");
        });
    }
    ObrisiSaFetch() {
        fetch("https://localhost:5001/Takmicenje/DeleteKlub/" + this.ime, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ime: this.ime,
                datum_prijave: this.arrive_time
            })
        });
    }
    crtajKlub(host) {
        if (!host)
            throw new Error("Greska!");

        this.container = document.createElement("div");
        this.container.classList.add("container");
        // this.container.classList.add(this.ime);
        host.appendChild(this.container);

        this.drawForm(this.container);

        //OVDE SE ULAZI SAMO AKO KLUB VEC SADRZI TAKMICARE, TO SU KLUBOVI KOJI SE POZIVAJU IZ BAZE
        if (this.takmicari.length > 0) {
            for (let i = 0; i < this.takmicari.length; i++) {
                //    console.log(this.klubovi);
                //    console.log(i);
                switch (this.takmicari[i].kategorija) {
                    case "KADETI": {
                        this.crtajTakmicara(this.takmicari[i], this.container.getElementsByClassName("tabelaKADETI"));
                    }
                        break;

                    case "JUNIORI":
                        {
                            this.crtajTakmicara(this.takmicari[i], this.container.getElementsByClassName("tabelaJUNIORI"));
                        }
                        break;

                    case "SENIORI":
                        {
                            this.crtajTakmicara(this.takmicari[i], this.container.getElementsByClassName("tabelaSENIORI"));
                        }
                        break;
                    default:
                        alert("GRESKA UNUTAR SWITCH-A!");
                        break;
                }
            }
        }
        this.azurirajBrojTakmicara();
    }
    drawForm(host) {
        const contForm = document.createElement("div");
        contForm.className = "contForm";
        host.appendChild(contForm);

        const contForm1 = document.createElement("div");
        contForm1.className = "contForm1";
        contForm.appendChild(contForm1);

        let something = document.createElement("h2");
        something.className = "imeKluba";
        something.innerHTML = "Ime kluba: " + this.ime;
        contForm1.appendChild(something);

        something = document.createElement("h3");
        something.className = "brojT";
        something.innerHTML = "Broj takmicara: " + this.brojT;
        contForm1.appendChild(something);

        something = document.createElement("label");
        something.innerHTML = "Unesite ime:";
        contForm1.appendChild(something);
        something = document.createElement("input");
        something.type = "text";
        something.className = "ime";
        contForm1.appendChild(something);

        something = document.createElement("label");
        something.innerHTML = "Unesite prezime:";
        contForm1.appendChild(something);
        something = document.createElement("input");
        something.type = "text";
        something.className = "prezime";
        contForm1.appendChild(something);


        something = document.createElement("label");
        something.innerHTML = "Unesite kilazu:";
        contForm1.appendChild(something);
        something = document.createElement("input");

        something.type = "number";
        something.placeholder = "70";
        something.className = "kilaza";
        contForm1.appendChild(something);

        something = document.createElement("label");
        something.innerHTML = "Izaberite kategoriju:";
        contForm1.appendChild(something);

        let tipoviUzrasta = ["KADETI", "JUNIORI", "SENIORI"];

        let opcija = null;
        let labela = null;
        let divRb = null;

        tipoviUzrasta.forEach((uzrast, index) => {
            divRb = document.createElement("div");
            opcija = document.createElement("input");
            opcija.type = "radio";
            opcija.name = this.ime;
            opcija.className = "radioB";
            opcija.value = tipoviUzrasta[index];

            labela = document.createElement("label");
            labela.innerHTML = uzrast;

            divRb.className = "RadioDiv";
            divRb.appendChild(opcija);
            divRb.appendChild(labela);
            contForm1.appendChild(divRb);
        })

        something = document.createElement("button");
        something.innerHTML = "Dodaj takmicara";
        something.className = "dugme";
        contForm1.appendChild(something);
        something.onclick = (ev) => {
            this.ObradiTakmicara();
            this.azurirajBrojTakmicara();
        }
        this.crtajKategorije(this.container);
    }
    ObradiTakmicara() {

        const imeTakmicara = this.container.querySelector(".ime").value;
        const prezimeTakmicara = this.container.querySelector(".prezime").value;
        const kilazaTakmicara = parseInt(this.container.querySelector(".kilaza").value);
        var CekiranoDugme = this.container.querySelector(`input[name='${this.ime}']:checked`);

        if (!this.validiraj(imeTakmicara, prezimeTakmicara, kilazaTakmicara, CekiranoDugme))
            return;
        const tip = CekiranoDugme.value;

        var NoviT = new Takmicar(imeTakmicara, prezimeTakmicara, kilazaTakmicara, tip, this.ime);
        this.dodajTakmicara(NoviT);
        switch (tip) {
            case "KADETI": {
                this.crtajTakmicara(NoviT, this.container.getElementsByClassName("tabelaKADETI"));
            }
                break;

            case "JUNIORI":
                {
                    this.crtajTakmicara(NoviT, this.container.getElementsByClassName("tabelaJUNIORI"));
                }
                break;

            case "SENIORI":
                {
                    this.crtajTakmicara(NoviT, this.container.getElementsByClassName("tabelaSENIORI"));
                }
                break;
            default:
                alert("GRESKA UNUTAR SWITCH-A!");
                break;
        }
        NoviT.Fetch();
        this.OcistiFormu();
    }

    validiraj(imeTakmicara, prezimeTakmicara, kilazaTakmicara, CekiranoDugme) {
        if (CekiranoDugme == null) {
            alert("Niste odabrali kategoriju!");
            return false;
        }
        if (/[^a-zA-Z]/.test(imeTakmicara) || imeTakmicara == "") {
            alert("Lose ste uneli ime!");
            return false;
        }

        if (/[^a-zA-Z]/.test(prezimeTakmicara) || prezimeTakmicara == "") {
            alert("Lose ste uneli prezime!");
            return false;
        }
        if (Number.isNaN(kilazaTakmicara) || kilazaTakmicara < 20 || kilazaTakmicara > 200) {
            alert("Lose ste kilazu!");
            return false;
        }
        if (!(CekiranoDugme.value === "KADETI" || CekiranoDugme.value === "JUNIORI" || CekiranoDugme.value === "SENIORI")) {
            alert("Lose ste uneli kilazu!");
            return false;
        }
        else {
            return true;
        }
    }
    dodajTakmicara(Takmicar) {
        this.takmicari.push(Takmicar);
    }
    azurirajBrojTakmicara() {
        this.brojT = this.takmicari.length;
        var element = this.container.getElementsByClassName("brojT")[0];
        element.innerHTML = "Broj takmicara: " + this.brojT;
    }

    crtajTakmicara(Takmicar, kontejner) {

        var noviRed = document.createElement("tr");
        kontejner[0].appendChild(noviRed);

        var elementReda = document.createElement("td");
        elementReda.innerHTML = Takmicar.ime;
        noviRed.appendChild(elementReda);

        elementReda = document.createElement("td");
        elementReda.innerHTML = Takmicar.prezime;
        noviRed.appendChild(elementReda);

        elementReda = document.createElement("td");
        elementReda.innerHTML = Takmicar.kilaza;
        noviRed.appendChild(elementReda);

        elementReda = document.createElement("td");
        elementReda.innerHTML = Takmicar.kategorija;
        noviRed.appendChild(elementReda);
    }
    crtajKategorije(host) {
        if (!host) {
            alert("GRESKA KOD CRTANJA KATEGORIJA!");
            return;
        }
        let divUKont = document.createElement("div");
        divUKont.className = "DivSveTabele";
        this.container.appendChild(divUKont);

        let tipoviUzrasta = ["KADETI", "JUNIORI", "SENIORI"];
        tipoviUzrasta.forEach((uzrast, index) => {

            let divUKontDiv = document.createElement("div");
            divUKontDiv.className = "DivJednaTabela";
            divUKont.appendChild(divUKontDiv);

            let labela = document.createElement("label");
            labela.innerHTML = uzrast;
            labela.style.fontSize = "35px";
            labela.style.backgroundColor = "black";
            divUKontDiv.appendChild(labela);

            let tabela = document.createElement("table");
            tabela.className = `tabela${uzrast}`;
            divUKontDiv.appendChild(tabela);

            const red = document.createElement("tr");
            tabela.appendChild(red);

            let e = document.createElement("th");
            e.innerHTML = "IME";
            red.appendChild(e);


            e = document.createElement("th");
            e.innerHTML = "PREZIME";
            red.appendChild(e);

            e = document.createElement("th");
            e.innerHTML = "KILAZA";
            red.appendChild(e);

            e = document.createElement("th");
            e.innerHTML = "KATEGORIJA";
            red.appendChild(e);

        })
    }
    OcistiFormu() {
        document.getElementsByClassName("ime")[0].value = "";
        document.getElementsByClassName("prezime")[0].value = "";
        document.querySelector(".kilaza").value = "";
        var radios = document.getElementsByName(this.ime);
        for (var j = 0; j < radios.length; j++) {
            radios[j].checked = false;
        }
    }
}