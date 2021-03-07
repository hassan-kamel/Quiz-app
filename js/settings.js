import { Quiz } from "./quiz.js"
export class Settings {
    constructor() {
        this.category = document.getElementById("category");
        this.difficulty = document.getElementsByName("difficulty");
        this.number = document.getElementById("Number");
        this.cta = document.getElementById("startBtn");
        this.cta.addEventListener("click", this.startFun.bind(this));
        // console.log(this.cta);
    }
    async startFun() {

        let diff = [...this.difficulty].filter((el) => el.checked);

        let _url = (` https://opentdb.com/api.php?amount=${this.number.value}&category=${this.category.value}&difficulty=${diff[0].value}`);
        let _result = await this.fetchUrl(_url);
        console.log(_result);
        if (_result.length) {
            $("#setting").fadeOut(500, () => {
                $("#quiz").fadeIn(500, () => {
                    new Quiz(_result, this.number.value);
                });
            })

        }
    }
    async fetchUrl(url) {
        let response = await (await fetch(url)).json();
        return response.results;
        // console.log(response);
    }
}