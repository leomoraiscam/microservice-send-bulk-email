interface IStorageProvider {
  save(file: string): Promise<string>;
}

export default IStorageProvider;
