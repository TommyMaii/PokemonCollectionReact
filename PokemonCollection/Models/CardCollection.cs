using System.ComponentModel.DataAnnotations;

namespace PokemonCollection.Models;

public class CardCollection
{
    public int CollectionId { get; set; }
    public int CardId { get; }
    public PokemonCollection PokemonCollection { get; set; }
    public PokemonCard PokemonCard { get; set; }
}