using Microsoft.AspNetCore.Mvc;
using PokemonCollection.Models;

namespace PokemonCollection.Controllers;

    [Route("api/[controller]")]
    [ApiController]
public class CardController : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<PokemonCard>> GetCard()
    {
        var getCard = new GetCardMethod();
        var cards = new List<PokemonCard>()
        {
            new PokemonCard
            {
                CardName = getCard.getCardName(),
                CardImagePath = getCard.getCardImage()
            }
        };

        return Ok(cards);
    }
}