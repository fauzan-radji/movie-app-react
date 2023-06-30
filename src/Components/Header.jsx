import PropTypes from "prop-types";

export default function Header({ children }) {
  return <h1 className="py-4 text-center text-2xl font-bold">{children}</h1>;
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
