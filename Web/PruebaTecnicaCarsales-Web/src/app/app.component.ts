import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';  
import { EpisodeService } from './services/episode.service';
import { CharacterService } from './services/character.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, ToastrModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PruebaTecnicaCarsales-Web';
  episodes: any[] = [];
  characters: any[] = [];
  locations: any[] = [];
  speciesList: string[] = [];
  typesList: string[] = [];
  typesLocationList: string[] = [];
  dimensionLocationList: string[] = [];
  filterSpecies: string = '';
  searchQuery: string = '';  
  activeTab: string = 'characters';  


  filterCharacterName: string = '';
  filterCharacterStatus: string = '';
  filterCharacterSpecies: string = '';
  filterCharacterType: string = '';
  filterCharacterGender: string = '';

  
  filterLocationName: string = '';
  filterLocationType: string = '';
  filterLocationDimension: string = '';

 
  filterEpisodeName: string = '';
  filterEpisodeCode: string = '';


  currentPageCharacters: number = 1;
  totalPagesCharacters: number = 1;

  currentPageEpisodes: number = 1;
  totalPagesEpisodes: number = 1;

  currentPageLocations: number = 1;
  totalPagesLocations: number = 1;

 
  selectedCharacter: any = null;
  selectedEpisode: any = null;
  selectedLocation: any = null;

  constructor(
    private episodeService: EpisodeService,
    private characterService: CharacterService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
   
    this.loadEpisodes();
    this.loadCharacters();
    this.loadLocations();
  }

  extractUniqueSpecies(): void {
    
    const speciesSet = new Set(this.characters.map(character => character.species));
    this.speciesList = Array.from(speciesSet);
  }

  extractUniqueType(): void {
   
    const typesSet = new Set(this.characters.map(character => character.type));
    this.typesList = Array.from(typesSet);
  }

  extractUniqueLocationType(): void {
   
    const typesSet = new Set(this.locations.map(location => location.type));
    this.typesLocationList = Array.from(typesSet);
  }

  extractUniqueDimensionType(): void {
   
    const dimensionSet = new Set(this.locations.map(location => location.dimension));
    this.dimensionLocationList = Array.from(dimensionSet);
  }

  
  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  
  loadEpisodes(page: number = 1): void {
    this.episodeService.getAllEpisodes(page).subscribe(data => {
      this.episodes = data.results;
      this.totalPagesEpisodes = data.info.pages; 
      this.currentPageEpisodes = page; 
    });
  }


  loadCharacters(page: number = 1): void {
    this.characterService.getAllCharacters(page).subscribe(data => {
      this.characters = data.results;
      this.totalPagesCharacters = data.info.pages; 
      this.currentPageCharacters = page; 
      this.extractUniqueSpecies();
      this.extractUniqueType();
    });
  }

  loadLocations(page: number = 1): void {
    this.locationService.getAllLocations(page).subscribe(data => {
      this.locations = data.results;
      this.totalPagesLocations = data.info.pages; 
      this.currentPageLocations = page;
      this.extractUniqueLocationType();
      this.extractUniqueDimensionType();
    });
  }

  
applyFilters(): void {
  this.searchCharacter({ target: { value: this.searchQuery } });
}

applyFiltersLocation(): void {
  this.searchLocation({ target: { value: this.searchQuery } });
}

applyFiltersEpisode(): void {
  this.searchEpisode({ target: { value: this.searchQuery } });
}

searchCharacter(event: any): void {
  const filterParams: any = {};

  const searchTerm = event.target.value;  

  if (this.filterCharacterName) filterParams.name = this.filterCharacterName;
  if (this.filterCharacterStatus) filterParams.status = this.filterCharacterStatus;
  if (this.filterCharacterSpecies) filterParams.species = this.filterCharacterSpecies;
  if (this.filterCharacterType) filterParams.type = this.filterCharacterType;
  if (this.filterCharacterGender) filterParams.gender = this.filterCharacterGender;

  if (searchTerm) filterParams.name = searchTerm;

  this.characterService.filterCharacters(
    filterParams.name || '',
    filterParams.status || '',
    filterParams.species || '',
    filterParams.type || '',
    filterParams.gender || '',
    1 
  ).subscribe({
    next: (data) => {
      this.characters = data.results;
      this.totalPagesCharacters = data.info.pages;
      this.currentPageCharacters = 1;
    },
    error: (err) => {
 
      if (err.status === 404) {
       
        this.characters = [];
        console.error('No se encontraron personajes con estos filtros');
      
      } else if (err.status === 500) {
     
        console.error('Hubo un error en el servidor, por favor intenta más tarde');
    
      } else {
      
        console.error('Error inesperado:', err);
      }
    }
  });
}

searchLocation(event: any): void {
  const filterParams: any = {};

  const searchTerm = event.target.value;  


  if (this.filterLocationName) filterParams.name = this.filterLocationName;
  if (this.filterLocationType) filterParams.type = this.filterLocationType;
  if (this.filterLocationDimension) filterParams.dimension = this.filterLocationDimension;

  if (searchTerm) filterParams.name = searchTerm;

  this.locationService.filterLocations(
    filterParams.name || '',
    filterParams.type || '',
    filterParams.dimension || '',
    1 
  ).subscribe({
    next: (data) => {
      this.locations = data.results;
      this.totalPagesLocations = data.info.pages;
      this.currentPageLocations = 1;
    },
    error: (err) => {
    
      if (err.status === 404) {
        
        this.locations = [];
        console.error('No se encontraron ubicaciones con estos filtros');
       
      } else if (err.status === 500) {

        console.error('Hubo un error en el servidor, por favor intenta más tarde');
       
      } else {
        console.error('Error inesperado:', err);
      }
    }
  });
}



searchEpisode(event: any): void {
  const filterParams: any = {};

  const searchTerm = event.target.value;  


  if (this.filterEpisodeName) filterParams.name = this.filterEpisodeName;
  if (this.filterEpisodeCode) filterParams.episode = this.filterEpisodeCode;


  if (searchTerm) filterParams.name = searchTerm;

 
  this.episodeService.filterEpisodes(
    filterParams.name || '',
    filterParams.episode || '',
    1 
  ).subscribe({
    next: (data) => {
      this.episodes = data.results;
      this.totalPagesEpisodes = data.info.pages;
      this.currentPageEpisodes = 1;
    },
    error: (err) => {

      if (err.status === 404) {

        this.episodes = [];
        console.error('No se encontraron episodios con estos filtros');
      
      } else if (err.status === 500) {
        
        console.error('Hubo un error en el servidor, por favor intenta más tarde');
      
      } else {
        
        console.error('Error inesperado:', err);
      }
    }
  });
}

  nextPage(type: string): void {
    if (type === 'characters' && this.currentPageCharacters < this.totalPagesCharacters) {
      this.loadCharacters(this.currentPageCharacters + 1);
    } else if (type === 'episodes' && this.currentPageEpisodes < this.totalPagesEpisodes) {
      this.loadEpisodes(this.currentPageEpisodes + 1);
    } else if (type === 'locations' && this.currentPageLocations < this.totalPagesLocations) {
      this.loadLocations(this.currentPageLocations + 1);
    }
  }

  
  prevPage(type: string): void {
    if (type === 'characters' && this.currentPageCharacters > 1) {
      this.loadCharacters(this.currentPageCharacters - 1);
    } else if (type === 'episodes' && this.currentPageEpisodes > 1) {
      this.loadEpisodes(this.currentPageEpisodes - 1);
    } else if (type === 'locations' && this.currentPageLocations > 1) {
      this.loadLocations(this.currentPageLocations - 1);
    }
  }


  showCharacterDetail(id: number): void {
    this.characterService.getCharacterById(id).subscribe(data => {
      this.selectedCharacter = data;
      this.selectedEpisode = null;
      this.selectedLocation = null;
    });
  }

  
  showEpisodeDetail(id: number): void {
    this.episodeService.getEpisodeById(id).subscribe(data => {
      this.selectedEpisode = {
        ...data,
        air_date: data.airDate || 'N/A', 
        episode: data.episodeCode || 'N/A', 
        charactersDetails: [] 
      };

      this.selectedCharacter = null;
      this.selectedLocation = null;

      data.characters.forEach((characterUrl: string) => {
        const characterId = characterUrl.split('/').pop();
        if (characterId) {
          this.characterService.getCharacterById(+characterId).subscribe(characterData => {
            this.selectedEpisode.charactersDetails.push(characterData);
          });
        }
      });
    });
  }


  showLocationDetail(id: number): void {
    this.locationService.getLocationById(id).subscribe(data => {
      this.selectedLocation = data;
      this.selectedCharacter = null;
      this.selectedEpisode = null;
    });
  }

  toggleCharacterDetail(characterId: string): void {
    if (this.selectedCharacter && this.selectedCharacter.id === characterId) {
    
      this.selectedCharacter = null;
    } else {
     
      this.selectedCharacter = this.characters.find(character => character.id === characterId);
    }
  }
  
  toggleEpisodeDetail(episodeId: string): void {
    if (this.selectedEpisode && this.selectedEpisode.id === episodeId) {
     
      this.selectedEpisode = null;
    } else {
     
      this.selectedEpisode = this.episodes.find(episode => episode.id === episodeId);
    }
  }
  
  toggleLocationDetail(locationId: string): void {
    if (this.selectedLocation && this.selectedLocation.id === locationId) {
    
      this.selectedLocation = null;
    } else {
     
      this.selectedLocation = this.locations.find(location => location.id === locationId);
    }
  }
}
