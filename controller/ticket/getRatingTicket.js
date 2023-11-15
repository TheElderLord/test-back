
const getRatingTicket = async (rows) => {
    

    try {
        
       
        const rating = {};

        await Promise.all(
           
        rows.map(async (row) => {
           
            const rate = row.rating;

           

            try {
                if (!rating["perfect"]) {
                    rating["perfect"] = [];
                }
                if (!rating["good"]) {
                    rating["good"] = [];
                }
                if (!rating["satisfactory"]) {
                    rating["satisfactory"] = [];
                }
                if (!rating["bad"]) {
                    rating["bad"] = [];
                }
                if (!rating["empty"]) {
                    rating["empty"] = [];
                }
                const rateNum = rate * 1;
                switch (rateNum) {
                    case 5: rating["perfect"].push(row); break;
                    case 4: rating["good"].push(row); break;
                    case 3: rating["satisfactory"].push(row); break;
                    case 2: rating["bad"].push(row); break;
                    case 1: rating["bad"].push(row); break;
                    default: rating["empty"].push(row); break;
                }

            } catch (err) {
                console.log(err);
            }
        })
        );

        const rateJson = {
            totalLength: Object.values(rating).reduce((acc, rating) => acc + rating.length, 0),
            data: Object.keys(rating).map((ratingName) => ({
                ratingName: ratingName,
                count: rating[ratingName].length,
                // rows: alarm[alarmName],
            })),
        }

        return rateJson;
    } catch (err) {
        console.error(err);
       
    }
};

module.exports = getRatingTicket;


