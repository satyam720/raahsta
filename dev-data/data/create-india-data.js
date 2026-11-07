import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
export const seedId = (prefix, number) => prefix + number.toString(16).padStart(22, '0');

// Fictional itineraries and prices, with approximate real-world map stops.
export const destinations = [
  {
    key: 'rishikesh', name: 'The Rishikesh River Escape', state: 'Uttarakhand', city: 'Rishikesh', coordinates: [78.2676, 30.0869],
    duration: 4, difficulty: 'easy', price: 8499, group: 12, month: 3,
    summary: 'Slow mornings by the Ganga, forest walks and golden evenings in the foothills.',
    description: 'Begin beside the Ganga in Rishikesh, where riverside lanes and hillside viewpoints set an unhurried pace. Explore on foot with a local guide, share a simple Garhwali meal and leave time for chai by the water.\nA short outing towards Shivpuri and a forest walk near Neer Garh add a little fresh-air adventure. Evenings are for watching the light change over the river and getting to know your small group.',
    stops: [['Riverside arrival in Rishikesh', 78.2676, 30.0869, 1], ['Shivpuri valley outing', 78.3907, 30.1350, 2], ['Neer Garh forest walk', 78.3304, 30.1513, 3]],
    photoSearch: 'Rishikesh Ganges river landscape filetype:bitmap',
    highlights: ['The riverside walks and relaxed chai breaks made this a lovely short escape.', 'Our guide balanced the forest outing with plenty of free time in Rishikesh.', 'The small group and Garhwali food were the highlights of my weekend.', 'Sunset by the Ganga was a beautiful way to finish each day.'],
  },
  {
    key: 'manali', name: 'The Manali Mountain Trails', state: 'Himachal Pradesh', city: 'Manali', coordinates: [77.1892, 32.2432],
    duration: 6, difficulty: 'medium', price: 17999, group: 10, month: 5,
    summary: 'Pine-scented trails, mountain villages and wide-open views in the Kullu valley.',
    description: 'Settle into the Kullu valley and explore the quieter side of Manali. Village paths, pine forests and the Beas river make a beautiful backdrop for a week away from the rush.\nSpend a day in Solang, walk towards Jogini Falls and explore Naggar with your guide. This fictional itinerary mixes moderate walks with easy village afternoons; exact activities would depend on weather and local conditions.',
    stops: [['Meet the group in Manali', 77.1892, 32.2432, 1], ['Solang valley trails', 77.1551, 32.3168, 2], ['Jogini Falls walk', 77.1854, 32.2753, 4], ['Naggar village afternoon', 77.1718, 32.1137, 5]],
    photoSearch: 'Solang valley Manali mountains filetype:bitmap',
    highlights: ['The pine forest walks were exactly the break from city life I needed.', 'Naggar was my favourite stop and our guide made the village walk feel personal.', 'A good mix of mountain walks and quiet afternoons, without a rushed schedule.', 'The valley views and friendly group made the early starts worthwhile.'],
  },
  {
    key: 'ladakh', name: 'The Ladakh High Pass Journey', state: 'Ladakh', city: 'Leh', coordinates: [77.5771, 34.1526],
    duration: 9, difficulty: 'difficult', price: 38999, group: 8, month: 6,
    summary: 'Big skies, monastery courtyards and a slow journey through Ladakh’s high valleys.',
    description: 'Arrive in Leh and begin with two gentle days in town before travelling further into the high valleys. Monastery visits and conversations over Ladakhi food offer a different perspective on this dramatic landscape.\nThe mock route continues to Nubra and the Ladakh shore of Pangong before returning to Leh. This is fictional high-altitude travel data, not a safety plan or a guaranteed operating itinerary; real trips require appropriate acclimatisation, permits and local advice.',
    stops: [['Arrival and easy days in Leh', 77.5771, 34.1526, 1], ['Thiksey monastery visit', 77.6670, 34.0567, 3], ['Diskit and Nubra valley', 77.5478, 34.5516, 5], ['Pangong lakeside at Spangmik', 78.4565, 33.9064, 7]],
    photoSearch: 'Pangong Tso Ladakh landscape filetype:bitmap',
    highlights: ['I appreciated the quiet first days in Leh before we headed into the valleys.', 'The monastery courtyards and wide-open Nubra landscapes felt unforgettable.', 'A thoughtful pace and a very small group made a big difference on this journey.', 'Pangong’s changing colours were the highlight, alongside the local meals.'],
  },
  {
    key: 'kerala', name: 'The Kerala Backwater Wander', state: 'Kerala', city: 'Kochi', coordinates: [76.2673, 9.9312],
    duration: 6, difficulty: 'easy', price: 21999, group: 12, month: 2,
    summary: 'Fort Kochi lanes, tea-covered hills and peaceful waterways around Alappuzha.',
    description: 'Start with the old streets and waterfront of Fort Kochi before heading towards Munnar’s green hills. There is time to wander, taste regional dishes and pause at viewpoints along the way.\nContinue to Alappuzha for a relaxed backwater outing and village walks beside the canals. This mock journey is about slowing down: shared meals, water reflections and the pleasure of an afternoon with nowhere to rush.',
    stops: [['Fort Kochi waterfront', 76.2420, 9.9656, 1], ['Munnar tea-country outing', 77.0595, 10.0889, 3], ['Alappuzha backwater villages', 76.3388, 9.4981, 5]],
    photoSearch: 'Kerala backwaters houseboat landscape filetype:bitmap',
    highlights: ['The backwater afternoon was wonderfully peaceful and the food was excellent.', 'I loved the contrast between Fort Kochi’s lanes and Munnar’s tea hills.', 'An easy-going journey that left enough space for unplanned little discoveries.', 'The canal-side village walk was more memorable than any checklist of sights.'],
  },
  {
    key: 'goa', name: 'The Goa Coastal Slowdown', state: 'Goa', city: 'Panaji', coordinates: [73.8278, 15.4909],
    duration: 4, difficulty: 'easy', price: 11999, group: 12, month: 1,
    summary: 'Colourful neighbourhoods, south Goa beaches and long lunches by the coast.',
    description: 'Look beyond the usual beach checklist on a gentle Goa escape. Begin in Panaji’s colourful lanes, explore the Fontainhas neighbourhood and meet your group over a relaxed Goan meal.\nHead south for quieter coastal walks around Agonda and Palolem. This sample itinerary leaves room for early swims, café stops and sunsets, with no pressure to fill every hour.',
    stops: [['Panaji arrival', 73.8278, 15.4909, 1], ['Fontainhas neighbourhood walk', 73.8330, 15.4935, 1], ['Agonda coastal afternoon', 73.9851, 15.0444, 2], ['Palolem beach morning', 74.0232, 15.0099, 3]],
    photoSearch: 'Palolem beach',
    highlights: ['The south Goa beach walks were peaceful and never felt rushed.', 'Fontainhas and the local food stops gave this trip more character than a beach holiday.', 'A simple, sunny break with good company and plenty of time to ourselves.', 'Agonda at sunset was my favourite moment of the whole trip.'],
  },
  {
    key: 'rajasthan', name: 'The Rajasthan Desert Stories', state: 'Rajasthan', city: 'Jaipur', coordinates: [75.7873, 26.9124],
    duration: 8, difficulty: 'medium', price: 27999, group: 12, month: 2,
    summary: 'Pink-city mornings, blue lanes and desert skies on a Rajasthan discovery.',
    description: 'Follow a trail of courtyards, colourful markets and desert towns through Rajasthan. Start in Jaipur with old-city walks and a visit towards Amer, then travel west to Jodhpur.\nThe mock route finishes in Jaisalmer with time around the fort and an evening outside town under open skies. Expect shared meals, craft stops and time to explore the lanes with your guide rather than race between monuments.',
    stops: [['Jaipur old-city arrival', 75.7873, 26.9124, 1], ['Amer fort surroundings', 75.8513, 26.9855, 2], ['Jodhpur blue-city lanes', 73.0243, 26.2389, 4], ['Jaisalmer desert town', 70.9167, 26.9157, 6]],
    photoSearch: 'Jaisalmer fort',
    highlights: ['The old-city walks and craft stops made the journey feel much more personal.', 'Jodhpur’s blue lanes were wonderful to explore with a guide who knew the quieter corners.', 'Longer travel days, but the mix of cities and desert scenery was worth it.', 'The evening outside Jaisalmer and our shared local dinners were the best parts.'],
  },
  {
    key: 'meghalaya', name: 'The Meghalaya Cloud Trails', state: 'Meghalaya', city: 'Shillong', coordinates: [91.8933, 25.5788],
    duration: 8, difficulty: 'medium', price: 24999, group: 10, month: 3,
    summary: 'Living root bridges, forest paths and clear river views in the Khasi Hills.',
    description: 'Begin in Shillong and travel into the Khasi Hills, where misty viewpoints and village paths invite a slower kind of exploring. Local hosts and shared meals are central to this fictional small-group journey.\nWalk towards Nongriat’s living root bridges, pause around Sohra and continue to the Dawki river area. There are steep steps and longer walking days, balanced with time to rest and appreciate the landscape.',
    stops: [['Shillong arrival', 91.8933, 25.5788, 1], ['Sohra viewpoints', 91.7323, 25.2848, 3], ['Nongriat root-bridge walk', 91.6809, 25.2478, 4], ['Dawki riverside', 92.0203, 25.1857, 6]],
    photoSearch: 'Nongriat root bridge',
    highlights: ['The root-bridge walk was demanding, but the forest and village setting were special.', 'Our local hosts and home-cooked meals were the heart of this trip.', 'There was a good balance between walking days and time to enjoy the viewpoints.', 'The river views near Dawki were beautiful and the small group worked really well.'],
  },
  {
    key: 'coorg', name: 'The Coorg Coffee Country Escape', state: 'Karnataka', city: 'Madikeri', coordinates: [75.7382, 12.4244],
    duration: 4, difficulty: 'easy', price: 10999, group: 10, month: 2,
    summary: 'Coffee-estate mornings, forest air and quiet viewpoints in the Kodagu hills.',
    description: 'Take a short break in the green hills around Madikeri. This mock itinerary follows coffee-estate paths, local food and easy outings, with enough breathing room to make a long weekend feel longer.\nVisit Abbey Falls, pause at Raja’s Seat and spend time in the villages around the Cauvery’s headwaters. Small-group walks and slow breakfasts are the point, rather than squeezing in every possible stop.',
    stops: [['Madikeri town arrival', 75.7382, 12.4244, 1], ['Abbey Falls outing', 75.7196, 12.4581, 2], ['Raja’s Seat sunset', 75.7386, 12.4149, 2], ['Bhagamandala village visit', 75.5294, 12.3876, 3]],
    photoSearch: 'Coorg landscape',
    highlights: ['Coffee-estate mornings and unhurried breakfasts were exactly what I needed.', 'The guide kept the walks gentle and the local food recommendations were lovely.', 'A refreshing short trip, with plenty of green views and no rushed sightseeing.', 'Madikeri’s viewpoints were beautiful, especially in the soft evening light.'],
  },
  {
    key: 'andaman', name: 'The Andaman Island Drift', state: 'Andaman and Nicobar Islands', city: 'Sri Vijaya Puram', coordinates: [92.7265, 11.6234],
    duration: 7, difficulty: 'easy', price: 32999, group: 10, month: 2,
    summary: 'Island mornings, white-sand beaches and a slower rhythm in the Andamans.',
    description: 'Begin in Sri Vijaya Puram, also known as Port Blair, before following a fictional island route to Swaraj Dweep and Shaheed Dweep. Beach walks, blue water and shared meals set the pace.\nThere is time at Radhanagar and around the shores of Shaheed Dweep, with flexible afternoons between outings. Ferry schedules and sea conditions would shape a real trip; these sample dates and inclusions are for app demonstration only.',
    stops: [['Arrival in Sri Vijaya Puram', 92.7265, 11.6234, 1], ['Swaraj Dweep island stay', 93.0000, 12.0000, 2], ['Radhanagar beach afternoon', 92.9492, 12.0069, 3], ['Shaheed Dweep island stay', 93.0400, 11.8300, 5]],
    photoSearch: 'Radhanagar beach',
    highlights: ['Radhanagar’s wide beach and the relaxed island pace were wonderful.', 'I enjoyed having free afternoons instead of a packed activity schedule.', 'The island transfers were clearly explained and the group was lovely company.', 'Quiet morning walks on Shaheed Dweep were the highlight for me.'],
  },
];

export function buildIndiaData() {
  const names = ['Satyam Pandey', 'Aditi Sharma', 'Kabir Mehta', 'Meera Nair', 'Arjun Singh', 'Nisha Rao', 'Tenzin Dorje', 'Aarav Patel', 'Ananya Iyer', 'Rohan Das', 'Ishita Sen', 'Vikram Joshi', 'Diya Kapoor', 'Kavya Menon', 'Aditya Verma', 'Sana Khan', 'Neel Shah'];
  const users = names.map((name, i) => ({
    _id: seedId('65', i + 1), name,
    email: i === 0 ? 'admin@raahsta.example' : `${name.toLowerCase().replace(' ', '.')}@example.com`,
    role: i === 0 ? 'admin' : i < 7 ? (i % 2 ? 'lead-guide' : 'guide') : 'user',
    active: true, photo: `india-user-${i + 1}.png`,
  }));
  const tours = destinations.map((d, i) => ({
    _id: seedId('66', i + 1), name: d.name, slug: d.name.toLowerCase().replaceAll(' ', '-'),
    duration: d.duration, maxGroupSize: d.group, difficulty: d.difficulty, price: d.price,
    summary: d.summary, description: d.description,
    imageCover: `india-${d.key}-cover.jpg`, images: [1, 2, 3].map(n => `india-${d.key}-${n}.jpg`),
    startDates: [0, 1, 2].map(n => new Date(Date.UTC(2027, d.month - 1 + n, 12 + i % 4, 3, 30)).toISOString()),
    startLocation: { type: 'Point', coordinates: d.coordinates, address: `${d.city}, ${d.state}, India`, description: `${d.city}, ${d.state}` },
    locations: d.stops.map(([description, longitude, latitude, day]) => ({ type: 'Point', coordinates: [longitude, latitude], address: `${d.state}, India`, description, day })),
    guides: [seedId('65', 2 + (i % 3) * 2), seedId('65', 3 + (i % 3) * 2)],
    secretTour: false,
  }));
  const reviews = tours.flatMap((tour, i) => destinations[i].highlights.map((review, j) => ({
    _id: seedId('67', i * 4 + j + 1), tour: tour._id, user: seedId('65', 8 + (i * 3 + j) % 10),
    review, rating: j === (i % 4) ? 4 : 5,
    createdAt: new Date(Date.UTC(2026, 9, 3 + i + j)).toISOString(),
  })));
  for (const tour of tours) {
    const matching = reviews.filter(review => review.tour === tour._id);
    tour.ratingsQuantity = matching.length;
    tour.ratingsAverage = Math.round(matching.reduce((sum, review) => sum + review.rating, 0) / matching.length * 10) / 10;
  }
  const bookings = tours.slice(0, 6).map((tour, i) => ({
    _id: seedId('68', i + 1), tour: tour._id, user: seedId('65', 8 + i), price: tour.price, currency: 'INR', paid: true,
    createdAt: new Date(Date.UTC(2026, 10, 1 + i)).toISOString(),
  }));
  return { users, tours, reviews, bookings };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const data = buildIndiaData();
  for (const [collection, records] of Object.entries(data)) fs.writeFileSync(path.join(directory, `${collection}.json`), JSON.stringify(records, null, 2) + '\n');
  fs.writeFileSync(path.join(directory, 'tours-simple.json'), JSON.stringify(data.tours, null, 2) + '\n');
  const sample = data.tours[4];
  fs.writeFileSync(path.join(directory, 'tour5.js'), '// Illustrative India mock tour, regenerated from create-india-data.js.\nexport default ' + JSON.stringify(sample, null, 2) + ';\n');
  process.stdout.write(`Generated India fixtures: ${data.tours.length} tours, ${data.users.length} users, ${data.reviews.length} reviews, ${data.bookings.length} bookings.\n`);
}
