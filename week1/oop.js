'use strict';
class Movie {
    constructor(title, director) {
        this.title = title;
        this.director = director;
        this.stars = [];
        this.whriters = [];
        this.ratings = [];
    }

    getTitle() {
        return this.title;
    }

    getDirector() {
        return this.director;
    }

    addStar(star) {
        this.stars.push(star);
    }

    getStars() {
        return this.stars;
    }

    addWriter(writer) {
        this.writers.push(writer);
    }

    getWriters() {
        return this.writers;
    }

    addRating(rating) {
        this.ratings.push(rating);
    }

    getAverageRating() {
        let average = this.ratings.reduce(function (sum, item) { return sum + item },0) / this.ratings.length;
        return average;
    }

    // ... Add yours :-) Look to IMDB for inspiration
}

class StaffMember {
    constructor(name, role, dateOfBirth) {
        this.name = name;
        this.role = role;
        this.dateOfBirth = dateOfBirth;
        this.movies = [];
    }

    addMovie(movie) {
        this.movies.push(movie);
    }

    getName() {
        return this.name;
    }

    getRole() {
        return this.role;
    }

    getAge() {
        return new Date().getFullYear() - this.dateOfBirth;
    }
}

// Pick your favorite movie from http://www.imdb.com/

const myMovie = new Movie('anything','anyone');

const firstActor = new StaffMember('anas','student',1979);
myMovie.addStar(firstActor);

// create and add more staff members

// // Make sure that the following actions work.
console.log(myMovie.getStars().map(actor => `${actor.getName()}: ${actor.getAge()}`));
const director = myMovie.getDirector();
console.log(`Director: ${director}`);