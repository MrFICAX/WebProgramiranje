export class Takmicar {
    constructor( ime, prezime, kilaza, kategorija, klub) {
        //this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.kilaza = kilaza;
        this.kategorija = kategorija;
        this.klub = klub;
    }
    Fetch() {
        fetch("https://localhost:5001/Takmicenje/PostTakmicar/"+this.klub, {
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
                    alert("Uspesno ste dodali novog takmicara!");
                });
            }
            else if (p.status == 406) {
                alert("Input all informations.");
            }
        }).catch(p => {
            alert("Error");
        });
    }
}