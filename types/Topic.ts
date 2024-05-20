enum Topic {
  DEFAMATION = "DEFAMATION",
  FAKE_NEWS = "FAKE_NEWS",
}

const TOPIC_TO_HEBREW: Record<Topic, string> = {
  DEFAMATION: "לשון הרע",
  FAKE_NEWS: "פייק ניוז",
};

export { TOPIC_TO_HEBREW, Topic };
