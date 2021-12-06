class Job {
    /**
     * @param name: The name of the opportunity
     * @param company: The name of the company
     * @param description: The description of the opportunity
     * @param date: An array of size 2 containing start date (string DD:MM:YYYY)
     * and end date (string DD:MM:YYYY) 
     */
    constructor(name, company, description, date) {
        this.name = name
        this.description = description
        this.company = company
        this.date = date
    }
}