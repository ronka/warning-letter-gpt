enum Topic {
  DEFAMATION = "DEFAMATION",
  FAKE_NEWS = "FAKE_NEWS",
  COPYRIGHT = "COPYRIGHT",
}

const TOPIC_TO_HEBREW: Record<Topic, string> = {
  DEFAMATION: "לשון הרע",
  FAKE_NEWS: "פייק ניוז",
  COPYRIGHT: "זכויות יוצרים",
};

const TOPIC_TO_REFERENCE: Record<Topic, string> = {
  DEFAMATION:
    "https://www.kolzchut.org.il/he/%D7%94%D7%92%D7%93%D7%A8%D7%AA_%D7%9C%D7%A9%D7%95%D7%9F_%D7%94%D7%A8%D7%A2",
  FAKE_NEWS:
    "https://www.kolzchut.org.il/he/%D7%94%D7%92%D7%93%D7%A8%D7%AA_%D7%9C%D7%A9%D7%95%D7%9F_%D7%94%D7%A8%D7%A2",
  COPYRIGHT:
    "https://www.kolzchut.org.il/he/%D7%A9%D7%9E%D7%99%D7%A8%D7%94_%D7%A2%D7%9C_%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA_%D7%99%D7%95%D7%A6%D7%A8%D7%99%D7%9D_%D7%91%D7%A8%D7%A9%D7%AA",
};

export { TOPIC_TO_HEBREW, Topic, TOPIC_TO_REFERENCE };
