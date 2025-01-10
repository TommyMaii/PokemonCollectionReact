using System.ComponentModel.DataAnnotations;

namespace PokemonCollection.Models;

public class User
{
    [Key] 
    [Required]

    public int UserId { get; set; }
    
    public string UserName { get; set; }
    public int CollectionId { get; set; }
}