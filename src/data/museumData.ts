export interface Museum {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
  artifacts: Artifact[];
}

export interface Artifact {
  id: number;
  title: string;
  lat: number;
  lng: number;
  description: string;
}

export const museums: Museum[] = [
  {
    id: 1,
    name: "İzmir Arkeoloji Müzesi",
    lat: 38.4137,
    lng: 27.1283,
    description: "İzmir'in en büyük arkeoloji müzesi, Konak'ta.",
    artifacts: [
      { id: 101, title: "Hellenistik Sikke", lat: 38.4137, lng: 27.1283, description: "MÖ 3. yüzyıl gümüş sikke." },
      { id: 102, title: "Roma Dönemi Heykel", lat: 38.4140, lng: 27.1288, description: "MS 2. yüzyıl mermer heykel." },
    ],
  },
  {
    id: 2,
    name: "Karşıyaka Evrensel Değerler Müzesi",
    lat: 38.4580,
    lng: 27.1150,
    description: "Karşıyaka'da modern bir kültür merkezi.",
    artifacts: [
      { id: 201, title: "Cumhuriyet Dönemi Belgeseli", lat: 38.4580, lng: 27.1150, description: "1923 sonrası Karşıyaka." },
    ],
  },
  {
    id: 3,
    name: "Latife Hanım Köşkü Anı Evi",
    lat: 38.4562,
    lng: 27.1198,
    description: "Karşıyaka'da tarihi bir köşk müzesi.",
    artifacts: [
      { id: 301, title: "Atatürk ve Latife Hanım Fotoğrafı", lat: 38.4562, lng: 27.1198, description: "1923 yılına ait." },
    ],
  },
];