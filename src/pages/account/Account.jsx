import { useState } from "react";
import styles from "./account.module.css";
import logo from "../../assets/ARIA FULL PRESENTATION-43.svg";

// The three views of this page share one form shell
const VIEWS = {
  signin: {
    subtitle: "Sign in to your account",
    button: "Sign In",
  },
  register: {
    subtitle: "Create your account",
    button: "Create Account",
  },
  forgot: {
    subtitle: "Reset your password",
    button: "Send Reset Link",
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Account() {
  const [view, setView] = useState("signin");
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const config = VIEWS[view];

  const switchView = (next) => {
    setView(next);
    setErrors({});
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};

    if (view === "register" && !values.name.trim()) {
      next.name = "Please enter your name.";
    }
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (view !== "forgot" && values.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }

    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // TODO: connect to your backend / auth service here.
    // For now the form only shows a confirmation message.
    if (view === "signin") setMessage("Welcome back. (Connect your auth service to finish sign in.)");
    if (view === "register") setMessage("Account created. (Connect your auth service to save it.)");
    if (view === "forgot") setMessage("If that email exists, a reset link is on its way.");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
       <h1 className={styles.brand}>
  <img src={logo} alt="ARIA" className={styles.logo} />
</h1>
        <p className={styles.subtitle}>{config.subtitle}</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {view === "register" && (
            <div className={styles.field}>
              <label htmlFor="account-name" className="sr-only">
                Full name
              </label>
              <input
                id="account-name"
                name="name"
                type="text"
                className={styles.input}
                placeholder="Full name"
                value={values.name}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="account-email" className="sr-only">
              Email address
            </label>
            <input
              id="account-email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="Email address"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          {view !== "forgot" && (
            <div className={styles.field}>
              <label htmlFor="account-password" className="sr-only">
                Password
              </label>
              <input
                id="account-password"
                name="password"
                type="password"
                className={styles.input}
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                autoComplete={view === "signin" ? "current-password" : "new-password"}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>
          )}

          <button type="submit" className={styles.submit}>
            {config.button}
          </button>

          {message && (
            <p className={styles.success} role="status">
              {message}
            </p>
          )}
        </form>

        <div className={styles.links}>
          {view === "signin" && (
            <>
              <p className={styles.switch}>
                New here?{" "}
                <button type="button" onClick={() => switchView("register")}>
                  Create an account
                </button>
              </p>
              <button type="button" className={styles.forgot} onClick={() => switchView("forgot")}>
                Forgot password?
              </button>
            </>
          )}

          {view === "register" && (
            <p className={styles.switch}>
              Already have an account?{" "}
              <button type="button" onClick={() => switchView("signin")}>
                Sign in
              </button>
            </p>
          )}

          {view === "forgot" && (
            <p className={styles.switch}>
              Remembered it?{" "}
              <button type="button" onClick={() => switchView("signin")}>
                Back to sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;