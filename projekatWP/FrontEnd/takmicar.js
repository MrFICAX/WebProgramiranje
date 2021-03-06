export class Takmicar {
    constructor(ime, prezime, kilaza, kategorija, klub, idKluba, njegovID) {
        this.id = idKluba; //id kluba za koji je prijavljen
        this.njegovID = njegovID;
        this.ime = ime;
        this.prezime = prezime;
        this.kilaza = kilaza;
        this.kategorija = kategorija;
        this.klub = klub;
    }
    azurirajKilazu(znak) {
        if (znak == "+")
            this.kilaza++;
        else
            this.kilaza--;
    }
    Fetch() {
        fetch("https://localhost:5001/Takmicenje/PostTakmicar/" + this.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ime: this.ime,
                prezime: this.prezime,
                kilaza: this.kilaza,
                kategorija: this.kategorija
            })
        }).then(p => {
            if (p.ok) {
                p.json().then(q => {
                    this.njegovID = q.id;
                    return p;
                });
            }
            else if (p.status == 406) {
                alert("Input all informations.");
                return p;
            }
        }).catch(p => {
            alert("Error");
            return p;
        });
    }
    FetchuUpdate() {
        fetch("https://localhost:5001/Takmicenje/UpdateTakmicar/" + this.njegovID, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.njegovID,
                ime: this.ime,
                prezime: this.prezime,
                kilaza: this.kilaza,
                kategorija: this.kategorija
            })
        }).then(p => {
            if (p.ok) {
                p.json().then(q => {
                    //alert("Uspesno ste izmeni takmicara!");
                });
            }
            else if (p.status == 404) {
                alert("Greska! Ne postoji instanca u bazi!");
            }
        }).catch(p => {
            alert("Error");
        });
    }
    Delete() {
        fetch("https://localhost:5001/Takmicenje/DeleteTakmicar/" + this.njegovID, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.njegovID,
                ime: this.ime,
                prezime: this.prezime,
                kilaza: this.kilaza,
                kategorija: this.kategorija
            })
        }).then(p => {
            if (p.ok) {
                p.json().then(q => {
                    console.log(p);
                    console.log(q);
                });
            }
            else if (p.status == 406) {
                alert("Input all informations.");
            }
            else{
                alert("Status code "+ p.status +" not found");
            }
        }).catch(p => {
            console.log(p);
            alert("Error");
        });
    }

}