namespace PruebaTecnicaCarsales.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Dimension { get; set; }
        public List<string> Residents { get; set; }
        public string Url { get; set; }
        public DateTime Created { get; set; }
    }

    public class LocationResponse
    {
        public Info Info { get; set; }
        public List<Location> Results { get; set; }
    }

  
}
