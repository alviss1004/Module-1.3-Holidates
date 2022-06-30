const API_KEY = "71e28858-f154-4bc0-a352-f7b9a62734fe";

const getCountries = async () => {
    try{
        const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`
        //here is how we add a dynamic value (API KEY) to the url
        const res = await fetch(url)
        const data = await res.json()
        console.log("data", data) //have a look the retrieved data
        return data
    } catch(err){
        console.log("err", err)
    }
}

const renderCountries = async()=>{
    try{
        const data = await getCountries()
        const countriesList = document.getElementById("countries-list")
        const ulCountriesList = countriesList.children[2]
        ulCountriesList.innerHTML=""
        data.countries.forEach((country, index)=>{
            const x = document.createElement("li")
            x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${country.name}</div>
                <div>Code: ${country.code}</div>
            </div>`;
            ulCountriesList.appendChild(x)
        })
    } catch(err){
        console.log("err", err)
    }
}

document.getElementById("countries-list-btn").addEventListener("click", () =>{
    renderCountries()
})

const getLanguages = async () => {
    try{
        const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`
        const res = await fetch(url)
        const data = await res.json()
        console.log("data", data) 
        return data
    } catch(err){
        console.log("err", err)
    }
}

const renderLanguages = async()=>{
    try{
        const data = await getLanguages()
        const languagesList = document.getElementById("languages-list")
        const ulLanguagesList = languagesList.children[2]
        ulLanguagesList.innerHTML=""
        data.languages.forEach((language, index)=>{
            const x = document.createElement("li")
            x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${language.name}</div>
                <div>Code: ${language.code}</div>
            </div>`;
            ulLanguagesList.appendChild(x)
        })
    } catch(err){
        console.log("err", err)
    }
}

document.getElementById("languages-list-btn").addEventListener("click", () =>{
    renderLanguages()
})

const inputCountry = document.getElementById("country-query");
const inputYear = document.getElementById("year-query");
const inputMonth = document.getElementById("month-query");
const inputDay = document.getElementById("day-query");
const inputSearch = document.getElementById("search-query");
const inputLanguage = document.getElementById("language-query");

const getHolidays = async () => {
    try{
        country = inputCountry.value;
        year = inputYear.value;
        month = inputMonth.value;
        day = inputDay.value;
        search = inputSearch.value;
        language = inputLanguage.value;

        if (!country && !year && !month &&!day && !search && !language) {
            country = "VN";
            year = "2021";
        }  
        if (country && !year && !month &&!day && !search && !language) {
            year = "2021";
        }

        if (!year) year = "2021";
        if (!country && !search) country = "VN";
        if (!language) language = "en";

        const url = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&country=${country}&year=${year}&month=${month}&day=${day}&language=${language}&search=${search}`
        const res = await fetch(url)
        const data = await res.json()



        const data2 = await getCountries()
        const holidaysList = document.getElementById("holidays-list")
        const title = holidaysList.children[0]
        data2.countries.forEach((cty) => {
            if (cty.code === country) title.textContent = `Holidays of ${cty.name}`
        })

        console.log("data", data) 
        return data
    } catch(err){
        console.log("err", err)
    }
}

const renderHolidays = async()=>{
    try{
        const data = await getHolidays()
        const holidaysList = document.getElementById("holidays-list")
        const ulHolidaysList = holidaysList.children[1]
        ulHolidaysList.innerHTML=""
        data.holidays.forEach((holiday, index)=>{
            const x = document.createElement("li")
            x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${holiday.name}</div>
                <div>${holiday.weekday.date.name} - ${holiday.date}</div>
            </div>`;
            ulHolidaysList.appendChild(x)
        })
    } catch(err){
        console.log("err", err)
    }
}

document.getElementById("holidays-btn").addEventListener("click", () =>{
    renderHolidays()
})