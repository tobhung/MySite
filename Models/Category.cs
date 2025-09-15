using MySite.Models;

namespace MySite.Models;

public class Category
{
    public int ID { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime Created { get; set; }

    public int Sort { get; set; }

    public virtual ICollection<Project> Projects{ get; set; }

}