using MySite.Models;
namespace MySite.Models;

public class Project
{
    public int ID { get; set; }

    public string? Content { get; set; }

    public DateTime Date { get; set; }

    public int CategoryID { get; set; }

    public decimal Price { get; set; }

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }

    public int ViewCount { get; set; }

    public virtual Category Category { get; set; }
    public virtual ICollection<ProjectImage> ProjectImages { get; set; } = new List<ProjectImage>();

}