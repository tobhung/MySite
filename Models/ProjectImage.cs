using System.ComponentModel.DataAnnotations;

namespace MySite.Models;

public class ProjectImage
{
    public int ID { get; set; }
        
    public int ProjectID { get; set; }
        
    public int FileID { get; set; }
        
    [StringLength(300)]
    public string? Caption { get; set; }
        
    public bool IsPrimary { get; set; } = false;
    public int Sort { get; set; }
    
    public virtual Project Project { get; set; }
}