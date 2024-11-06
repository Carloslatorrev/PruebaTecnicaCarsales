namespace PruebaTecnicaCarsales.Models
{
    public class Episode
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AirDate { get; set; }
        public string EpisodeCode { get; set; }
        public List<string> Characters { get; set; }
        public string Url { get; set; }
        public DateTime Created { get; set; }
    }

    public class EpisodeResponse
    {
        public Info Info { get; set; }
        public List<Episode> Results { get; set; }
    }
}
