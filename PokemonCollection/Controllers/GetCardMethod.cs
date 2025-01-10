using PokemonTcgSdk.Standard.Features.FilterBuilder.Pokemon;
using PokemonTcgSdk.Standard.Infrastructure.HttpClients;
using PokemonTcgSdk.Standard.Infrastructure.HttpClients.Base;
using PokemonTcgSdk.Standard.Infrastructure.HttpClients.Cards;
using PokemonTcgSdk.Standard.Infrastructure.HttpClients.Set;

namespace PokemonCollection.Controllers;

public class GetCardMethod
{
    static PokemonApiClient pokeClient = new PokemonApiClient();
    private Random random = new Random();
    private int randomNumber = 0;

    public GetCardMethod()
    {
        createRandomNumber();
    }
    public async Task<ApiResourceList<Card>> GetApiCall()
    {
        return await pokeClient.GetApiResourceAsync<Card>();
    }        
    private void createRandomNumber()
    {
        randomNumber = random.Next(0, 250);
    }

    public int getCardsLength()
    {
        var cardList = GetApiCall().Result;
        var cards = cardList.Results.ToList().Count;
        return cards;
    }
    public string getCardName()
    {
        var cardList = GetApiCall().Result;
        var cards = cardList.Results.ToList();
        Console.WriteLine(cards.Count);
        return cards[randomNumber].Name;
    }
    public Uri getCardImage()
    {
        var cardList = GetApiCall().Result;
        var cards = cardList.Results.ToList();
        return cards[randomNumber].Images.Small;
    }
    
    // static PokemonApiClient pokeClient = new PokemonApiClient();
//
// static async Task Main()
// {
//     using (var client = new HttpClient())
//     {
//         var cardSet = await pokeClient.GetApiResourceAsync<Set>();
//         var cardSets = cardSet.Results.ToList();
//         foreach (var set in cardSets)
//         {
//             Console.WriteLine(set.Name);
//         }
//         var filter = PokemonFilterBuilder.CreatePokemonFilter()
//             .AddName("Darkrai");
//         var cardList = await pokeClient.GetApiResourceAsync<Card>(filter);
//         var cards = cardList.Results.ToList();
//         foreach (var card in cards)
//         {
//             Console.WriteLine(card.Name);
//             Console.WriteLine(card.Images.Small);
//         }
//     }
// }
//
// gets all cards regardless of type

//
// // with pagination. take on the api is limited to a max of 250
//     var card = await pokeClient.GetApiResourceAsync<Card>(take: 10, skip: 2);
//
// // Pokemon Cards
//     var card = await pokeClient.GetApiResourceAsync<PokemonCard>();
//     var card = await pokeClient.GetApiResourceAsync<PokemonCard>(take: 10, skip: 2);
//
// // Trainer Cards
//     var card = await pokeClient.GetApiResourceAsync<TrainerCard>();
//     var card = await pokeClient.GetApiResourceAsync<TrainerCard>(take: 10, skip: 2);
//
// // Energy Cards
//     var card = await pokeClient.GetApiResourceAsync<EnergyCard>();
//     var card = await pokeClient.GetApiResourceAsync<EnergyCard>(take: 10, skip: 2);
//
// //Sets
//     var card = await pokeClient.GetApiResourceAsync<Set>();
//     var card = await pokeClient.GetApiResourceAsync<Set>(take: 10, skip: 2);
}