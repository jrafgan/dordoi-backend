const mongoose = require("mongoose");
const config = require("./config");
const User = require("./models/User");

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user1, user2, user3] = await User.create(
        {
            email: "soph@gmail.com",
            password: "123",
            username: "Sophia",
            role: "admin",
            image: "sophia.jpeg"
        },
        {
            email: "margo@gmail.com",
            password: "123",
            username: "Margaret",
            role: "user",
            image: "margaret.jpeg",
        },
        {
            email: "mark@gmail.com",
            password: "123",
            username: "Mark",
            role: "user",
            image: "mark.jpeg"
        },
    );

    // const [card1, card2, card3, card4, card5, card6] = await Card.create(
    //     {
    //         selectedCategory: "Электроника",
    //         selectedSubcategory: "Смартфоны",
    //         productTitle: "iPhone 13 Pro",
    //         productDescription: "Новый iPhone 13 Pro с OLED-дисплеем.",
    //         selectedBazaar: "Александровский рынок",
    //         sellerPhone: "+7 (123) 456-7890",
    //         containerRow: "A",
    //         containerNumber: "123",
    //         selectedImages: ["cappellacci.jpg", "cozze.jpg", "the-bar-area.jpg"],
    //         user: user1._id
    //     },
    //     {
    //         selectedCategory: "Одежда",
    //         selectedSubcategory: "Женская одежда",
    //         productTitle: "Платье в полоску",
    //         productDescription: "Платье с вертикальными полосками.",
    //         selectedBazaar: "Центральный рынок",
    //         sellerPhone: "+7 (987) 654-3210",
    //         containerRow: "B",
    //         containerNumber: "456",
    //         selectedImages: ["locanda.jpg", "margaret.jpeg", "vittoria-on-the-walk.jpg"],
    //         user: user2._id
    //     },
    //     {
    //         selectedCategory: "Техника",
    //         selectedSubcategory: "Бытовая техника",
    //         productTitle: "Холодильник Samsung",
    //         productDescription: "Современный холодильник с системой Frost-Free.",
    //         selectedBazaar: "Северный рынок",
    //         sellerPhone: "+7 (111) 222-3333",
    //         containerRow: "C",
    //         containerNumber: "789",
    //         selectedImages: ["marinated-octopus-with.jpg", "mark.jpeg"],
    //         user: user3._id
    //     },
    //     {
    //         selectedCategory: "Автомобили",
    //         selectedSubcategory: "Легковые авто",
    //         productTitle: "Toyota Camry",
    //         productDescription: "Седан Toyota Camry с бензиновым двигателем.",
    //         selectedBazaar: "Южный рынок",
    //         sellerPhone: "+7 (444) 555-6666",
    //         containerRow: "D",
    //         containerNumber: "101",
    //         selectedImages: ["photo0jpg.jpg", "pizza.jpg"],
    //         user: user1._id
    //     },
    //     {
    //         selectedCategory: "Спорт и отдых",
    //         selectedSubcategory: "Фитнес",
    //         productTitle: "Беговая дорожка",
    //         productDescription: "Профессиональная беговая дорожка для дома.",
    //         selectedBazaar: "Западный рынок",
    //         sellerPhone: "+7 (777) 888-9999",
    //         containerRow: "E",
    //         containerNumber: "202",
    //         selectedImages: ["polentoni.jpg", "scrambled-eggs-with-spinach.jpg"],
    //         user: user2._id
    //     },
    //     {
    //         selectedCategory: "Книги",
    //         selectedSubcategory: "Художественная литература",
    //         productTitle: "Роман 'Война и мир'",
    //         productDescription: "Известный роман Льва Толстого о войне и мире.",
    //         selectedBazaar: "Восточный рынок",
    //         sellerPhone: "+7 (666) 111-0000",
    //         containerRow: "F",
    //         containerNumber: "303",
    //         selectedImages: ["sophia.jpeg", "sunshine-on-leith.jpg"],
    //         user: user3._id
    //     }
    // );

    // await Rating.create(
    //     {
    //         food_quality: 5,
    //         service_quality: 5,
    //         interior: 5,
    //         cardId: card1._id,
    //         user: user2._id,
    //         comment: "Had dinner with girl friends. Menu is perfect, something for everyone. Service was awesome and Jason was very accommodating. Will be back definitely!"
    //     },
    //     {
    //         food_quality: 5,
    //         service_quality: 4,
    //         interior: 5,
    //         cardId: card3._id,
    //         user: user3._id,
    //         comment: "The job of a food reviewer is to accurately convey the interior, texture, smell, and presentation of a restaurant's food."
    //     },
    //     {
    //         food_quality: 5,
    //         service_quality: 2,
    //         interior: 5,
    //         cardId: card2._id,
    //         user: user3._id,
    //         comment: "Once you've had your meal and taken your notes, take a little time to see what the restaurant's history is. These kind of details are a great way to add some color to your review. "
    //     },
    //     {
    //         food_quality: 4,
    //         service_quality: 4,
    //         interior: 4,
    //         cardId: card2._id,
    //         user: user2._id,
    //         comment: "Visited as a guest in the Echo restaurant for lunch just today. We were entertaining friends from California, and enjoyed our ocean side table. We chose to stay indoors - to enjoy the air conditioning 😊. I just want to say that, in addition to a nice meal, we had a delightful waitress, Jackie. She had just the right balance of friendliness and efficiency. She recognized that we wanted time to visit and did not rush us. She and other staff members made certain that we had everything we needed. Kudos!"
    //     },
    //     {
    //         food_quality: 3,
    //         service_quality: 3,
    //         interior: 3,
    //         cardId: card3._id,
    //         user: user3._id,
    //         comment: "We had lunch here a few times while on the island visiting family and friends. The servers here are just wonderful and have great memories it seems. We sat on the ocean front patio and enjoyed the view with our delicious wine and lunch. Must try!"
    //     },
    //     {
    //         food_quality: 5,
    //         service_quality: 2,
    //         interior: 4,
    //         cardId: card4._id,
    //         user: user3._id,
    //         comment: "Hello. Please give our thanks to the Manager(s) and others for the wonderful room and bottle of sparkling wine for our Anniversary stay. We had an amazing time. The room was so comfortable, the food at Echo absolutely spectacular (we ate two meals there). Our waitress was just wonderful. Looking forward to staying with you in the future. What a great place!"
    //     },
    //     {
    //         food_quality: 3,
    //         service_quality: 5,
    //         interior: 5,
    //         cardId: card5._id,
    //         user: user1._id,
    //         comment: "Rachel at the Pool (drinks server) was so gorgeous. We chatted with her all weekend and she played with the kids. She's an asset to the hotel esp for people with families. I saw other attendants playing with the kids too which is so welcoming. Rachel was gorgeous. Give her a raise!"
    //     },
    //     {
    //         food_quality: 5,
    //         service_quality: 5,
    //         interior: 4,
    //         cardId: card6._id,
    //         user: user1._id,
    //         comment: "I had lunch with some of my colleagues at Echo on Day 1. I had the wedge salad - it was delicious. On Night 2, I enjoyed a drink at the bar. I had a Margarita. The service was excellent."
    //     }
    // );

    // await Image.create(
    //     {
    //         card: card1._id,
    //         user: user1._id,
    //         image: "the-bar-area.jpg"
    //     },
    //     {
    //         card: card2._id,
    //         user: user1._id,
    //         image: "the-bar-area.jpg"
    //     },
    //     {
    //         card: card3._id,
    //         user: user2._id,
    //         image: "marinated-octopus-with.jpg"
    //     },
    //     {
    //         card: card4._id,
    //         user: user2._id,
    //         image: "cozze.jpg"
    //     },
    //     {
    //         card: card5._id,
    //         user: user3._id,
    //         image: "photo0jpg (1).jpg"
    //     },
    //     {
    //         card: card6._id,
    //         user: user3._id,
    //         image: "polentoni.jpg"
    //     }
    // );

    return connection.close();
};

run().catch(error => {
    console.error("Something went wrong!", error);
});