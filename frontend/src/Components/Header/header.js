import React from 'react';

const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary w-100">
  <div class="container-fluid d-flex justify-content-between">
    {/* Left Section (Logo and Navigation Links) */}
    <a class="navbar-brand" href="/">NovaFit</a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Basketball</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Futsall</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ...
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>

    {/* Right Section (Search, Login, and Signup) */}
    <div class="d-flex">
      <form class="d-flex me-3" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/Login">Login</a>
        </li>
        <li class="nav-item">
          <button type="button" class="btn btn-success">SignUp</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Header;
