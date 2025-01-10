using System.ComponentModel.DataAnnotations;
namespace PokemonCollection.Models;

public class PokemonCard
{
    [Key]
    public Guid Guid { get; }
    public string CardName { get; set; }
    public Uri CardImagePath { get; set; }
    public ICollection<PokemonCollection> Collections { get; } = [];

}