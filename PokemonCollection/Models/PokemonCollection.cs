using System.ComponentModel.DataAnnotations;

namespace PokemonCollection.Models;

public class PokemonCollection
{
    [Key]
    public Guid Guid { get; set; }
    public ICollection<PokemonCard> Cards { get; } = [];
    
    public int UserId { get; set; }
}