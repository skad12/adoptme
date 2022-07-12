
import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
 
   const ANIMALS = ["cat", "dog", "bird", "sheep"]
   

function Search() {
    
const [location, setLocation] = useState();
const [animal, setAnimal] = useState();
const [pets, setPets] = useState();
const [breed, setBreed] = useState();
const [breeds] = useBreedList(animal);


useEffect(() => { 
    requestPets();
}, []);

async function requestPets() {

const res = await fetch(
    `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
);

const json= await res.json();

setPets(json.pets);

}
    
return (
        <>
        <div className=" antialiased min-h-screen card grid justify-items-end px-16 ">
           

            <form onSubmit={(e) => {
                
                e.preventDefault();
                requestPets();

            } } className="card glass w-96 card-body ">

                {/*location*/}
                <label htmlFor="location">
                    <p className="text-4xl pb-4">Location</p>

                    <input id="location" 
                    onChange={(e) => setLocation(e.target.value) } 
                    value={ location } placeholder="location"
                     className="input w-full max-w-xs"/><br/>

                </label>
                
                {/*animals*/}

                <label htmlFor="animal">
                    <p className="text-4xl pb-4">Animal</p>

                    <select id="animal" value={animal} 
                    onChange={(e) => setAnimal(e.target.value) } 
                    className="select w-full max-w-xs" >

                        <option/>

                            { ANIMALS.map((animal) => (
                                    <option value={animal} key={animal}>
                                        {animal}
                                    </option>
                                ))}
                        
                    </select>
                </label>


                {/*breeds*/}

                <label htmlFor="breed">
                    <p className="text-4xl pb-4">Breed</p>
                    <select id="breed" value={breed} onChange={(e) => setBreed(e.target.value) } className="select w-full max-w-xs" >

                        <option/>

                            {
                                breeds.map(breed => (
                                    <option value={breed} key={breed}>
                                        {breed}
                                    </option>
                                ))
                            }
                        
                    </select>
                </label>
                <button type="button" className="btn btn-success mt-4">Submit</button>
                
            </form>

        </div>
        </>
)
}

export default Search;