import axios from "axios";
import Board from "models/board";
import Tile from "models/tile";
import Animal from "models/animal";

class BoardServices {

    private async *_boardGenerator() {

        const _axios = axios.create({
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        });

        const fetchCatsDogs = (type: 'cat' | 'dog' = 'cat') => {

            type CatApiResponseType = {
                id: string,
                url: string,
                width: number,
                height: number
            };

            const url = type === 'cat' ?
                "https://api.thecatapi.com/v1/images/search?limit=4"
                :
                "https://api.thedogapi.com/v1/images/search?limit=4";

            return _axios
                .get(url)
                .then(({ data }) => data.map((item: CatApiResponseType) => item.url))
                .then((urls) => urls.map((item: string) => new Tile(item, Animal.Cat)));
        };

        // Not working, cors error:


        // const fetchDogs = () => {

        //     const url = "https://dog.ceo/api/breeds/image/random/4";

        //     return _axios
        //         .get(url)
        //         .then(({ data }) => data.message)
        //         .then((urls) => urls.map((item: string) => new Tile(item, Animal.Dog)));
        // };

        const fetchFox = () => {

            const url = "https://randomfox.ca/floof/";

            return _axios
                .get(url)
                .then(({ data }) => data.image)
                .then((image) => new Tile(image, Animal.Fox));
        };

        while (true) {
            const cats = await fetchCatsDogs('cat');
            const dogs = await fetchCatsDogs('dog');
            const fox = await fetchFox();
            yield new Board(cats, dogs, fox);
        }
    }

    public generator = this._boardGenerator();

}

export default new BoardServices();
