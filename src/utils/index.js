export function calculateAge(birthDate) {
  return new Date().getFullYear() - new Date(birthDate).getFullYear();
}
