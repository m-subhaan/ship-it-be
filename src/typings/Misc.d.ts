export type ReplaceKeys<Input, SearchKeys extends keyof Input, Updater> = {
  [InputKeys in keyof Input]: InputKeys extends SearchKeys
  ? InputKeys extends keyof Updater
  ? Updater[InputKeys]
  : never
  : Input[InputKeys];
};
