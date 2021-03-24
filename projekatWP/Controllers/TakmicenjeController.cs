using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using projekatWP_bar.Model;

namespace projekatWP_bar.Controller
{

    [Route("Takmicenje")]
    [ApiController]

    public class TakmicenjeController : ControllerBase
    {

        public TakmicenjeContext Context { get; set; }

        public TakmicenjeController(TakmicenjeContext context)
        {
            Context = context;
        }

        [Route("PostTakmicenje")]
        [HttpPost]
        public async Task PostTakmicenje([FromBody] Takmicenje takmicenje)
        {
            try
            {   Context.Takmicenja.Add(takmicenje);
                await Context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        [Route("PostKlub/{TakmicenjeID}")]
        [HttpPost]
        public async Task<IActionResult> PostKlub([FromRoute] int TakmicenjeID, [FromBody] Klub klub)
        {
            var takmicenje = await Context.Takmicenja.FindAsync(TakmicenjeID);
            klub.Takmicenje = takmicenje;
            Context.Klubovi.Add(klub);
            await Context.SaveChangesAsync();
            return Ok(klub);
        }

        [Route("PostTakmicar/{imeKluba}")]
        [HttpPost]
        public async Task<IActionResult> PostTakmicar([FromRoute] string imeKluba, [FromBody] Takmicar takmicar)
        {
            var klub = Context.Klubovi.Where(p => p.Ime == imeKluba).ToList().Last();
            takmicar.Klub = klub;
            Context.Takmicari.Add(takmicar);
            await Context.SaveChangesAsync();
            return Ok(takmicar);
        }

        [Route("GetTakmicenje")]
        [HttpGet]
        public async Task<List<Takmicenje>> GetTakmicenje()
        {
            return await Context.Takmicenja.Include(p => p.Klubovi).ThenInclude(q => q.Takmicari).ToListAsync();
        }

        //Vraca listu svih klubova
        //NIJE DEFINISAN FETCH SA POZIVOM OVE METODE        
        [Route("GetKlub")]
        [HttpGet]
        public async Task<List<Klub>> GetKlub()
        {
            return await Context.Klubovi.Include(q => q.Takmicari).ToListAsync();
        }

        //Vraca listu svih takmicara
        //NIJE DEFINISAN FETCH SA POZIVOM OVE METODE
        [Route("GetTakmicar")]
        [HttpGet]
        public async Task<List<Takmicar>> GetTakmicar()
        {
            return await Context.Takmicari.ToListAsync();
        }

        //brise takmicenje sa svim njegovim klubovima i takmicarima
        //NIJE DEFINISAN FETCH SA POZIVOM OVE METODE
        [Route("DeleteTakmicenje/{id}")]
        [HttpDelete]
        public async Task DeleteTakmicenje([FromRoute] int id, [FromBody] Takmicenje takmicenje)
        {
            try
            {
                var DobijenoTakmicenje = Context.Takmicenja.Where(p => p.ID == id).ToList().Last();
                List<Klub> DobijeniKlubovi = Context.Klubovi.Where(p => p.Takmicenje == DobijenoTakmicenje).ToList();
                foreach (Klub klub in DobijeniKlubovi)
                {
                    List<Takmicar> Takmicari = Context.Takmicari.Where(p => p.Klub == klub).ToList();
                    foreach (Takmicar takmicar in Takmicari)
                        Context.Remove(takmicar);
                    Context.Remove(klub);
                }
                Context.Remove(DobijenoTakmicenje);
                await Context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        //brise klub sa svim njegovim takmicarima
        [Route("DeleteKlub/{ime}")]
        [HttpDelete]
        public async Task DeleteKlub([FromRoute] string ime, [FromBody] Klub klub)
        {
            try
            {
                var Dobijeniklub = Context.Klubovi.Where(p => p.Ime == ime).ToList().Last();
                List<Takmicar> Takmicari = Context.Takmicari.Where(p => p.Klub == Dobijeniklub).ToList();
                foreach (Takmicar element in Takmicari)
                    Context.Remove(element);

                Context.Remove(Dobijeniklub);
                await Context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        //NIJE DEFINISAN FETCH SA POZIVOM OVE METODE
        [Route("DeleteTakmicar/{ime}")]
        [HttpDelete]
        public async Task DeleteTakmicar([FromRoute] string ime, [FromBody] Takmicar takmicar)
        {
            try
            {
                var DobijeniTakmicar = Context.Takmicari.Where(p => p.Ime == ime).ToList().Last();
                Context.Remove(DobijeniTakmicar);
                await Context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        [Route("UpdateKlub/{id}")]
        [HttpPost]
        public async Task<IActionResult> UpdateKlub([FromRoute] int id, [FromBody] Klub klub)
        {
            try
            {

                var DobijeniKlub = Context.Klubovi.Where(p => p.ID == id).ToList().Last();
                DobijeniKlub.Ime = klub.Ime;
                Context.Update(DobijeniKlub);
                await Context.SaveChangesAsync();
                return Ok(DobijeniKlub);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Ok(404);

            }
        }

        //NIJE DEFINISAN FETCH SA POZIVOM OVE METODE
        [Route("UpdateTakmicar/{imeTakmicara}")]
        [HttpPost]
        public async Task<IActionResult> UpdateTakmicar([FromRoute] string imeTakmicara, [FromBody] Takmicar takmicar)
        {
            var DobijeniTakmicar = Context.Takmicari.Where(p => p.Ime == imeTakmicara && p.Klub == takmicar.Klub).ToList().Last();
            DobijeniTakmicar.Ime = takmicar.Ime;
            Context.Update(DobijeniTakmicar);
            await Context.SaveChangesAsync();
            return Ok(DobijeniTakmicar);
        }
    }
}