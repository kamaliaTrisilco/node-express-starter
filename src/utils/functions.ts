interface IGenerateUsername {
  firstName: string;
  lastName: string;
}

export const generateUsername = ({
  firstName,
  lastName,
}: IGenerateUsername) => {
  return firstName && lastName
    ? `@${firstName ?? ""}-${lastName ?? ""}`.toLowerCase()
    : "";
};
