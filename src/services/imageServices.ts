import axios from "axios";

class ImageServices {

    private _axios = axios.create({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    private _resources = {
        cat: 'https://api.thecatapi.com/v1/images/search',
        dog: 'https://api.thedogapi.com/v1/images/search',
        fox: 'https://randomfox.ca/floof/'
    };

    private async fetchACatOrDog(type: 'cat' | 'dog' = 'cat') {

        try {

            const { data } = await (this._axios.get(this._resources[type]));

            return data[0].url;

        } catch (error) {

            console.error(error);
            throw error;

        }
    }

    private async fetchAFox() {

        try {
            const { data } = await this._axios.get(this._resources.fox);

            return data.image;

        } catch (error) {
            console.error(error);

            throw error;
        }
    }

    async fetch(animal: 'cat' | 'dog' | 'fox') {
        let url = '';

        if (animal === 'fox') {
            url = await this.fetchAFox();
        } else {
            url = await this.fetchACatOrDog(animal);
        }

        return url;

    }

    async loadImage(image: string, loadCallback: Function) {

        const img = new Image();

        img.onload = loadCallback();

        img.src = image;
    }
}

export default new ImageServices();
