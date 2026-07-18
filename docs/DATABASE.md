# 🗄️ Database Schema

## Core Tables

### Users Table

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    avatar_url VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);
```

### Roles Table

```sql
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Permissions Table

```sql
CREATE TABLE permissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NULL,
    module VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_module (module)
);
```

### Unit Kerja Table

```sql
CREATE TABLE unit_kerja (
    id BIGSERIAL PRIMARY KEY,
    kode VARCHAR(50) UNIQUE NOT NULL,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT NULL,
    parent_id BIGINT NULL REFERENCES unit_kerja(id),
    kepala_unit VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    telepon VARCHAR(20) NULL,
    alamat TEXT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_kode (kode),
    INDEX idx_parent_id (parent_id)
);
```

### Pegawai Table

```sql
CREATE TABLE pegawai (
    id BIGSERIAL PRIMARY KEY,
    nip VARCHAR(50) UNIQUE NOT NULL,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NULL,
    unit_kerja_id BIGINT NOT NULL REFERENCES unit_kerja(id),
    jabatan_id BIGINT NULL REFERENCES jabatan(id),
    tanggal_lahir DATE NULL,
    jenis_kelamin VARCHAR(10) NULL,
    alamat TEXT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_nip (nip),
    INDEX idx_unit_kerja_id (unit_kerja_id),
    INDEX idx_email (email)
);
```

### Renstra Table

```sql
CREATE TABLE renstra (
    id BIGSERIAL PRIMARY KEY,
    unit_kerja_id BIGINT NOT NULL REFERENCES unit_kerja(id),
    tahun_awal INT NOT NULL,
    tahun_akhir INT NOT NULL,
    visi TEXT NOT NULL,
    misi TEXT NOT NULL,
    tujuan TEXT NULL,
    status VARCHAR(50) DEFAULT 'draft',
    verifikasi_status VARCHAR(50) DEFAULT 'pending',
    approval_status VARCHAR(50) DEFAULT 'pending',
    created_by BIGINT REFERENCES users(id),
    verified_by BIGINT NULL REFERENCES users(id),
    verified_at TIMESTAMP NULL,
    approved_by BIGINT NULL REFERENCES users(id),
    approved_at TIMESTAMP NULL,
    catatan TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_unit_kerja_id (unit_kerja_id),
    INDEX idx_tahun (tahun_awal, tahun_akhir),
    INDEX idx_status (status)
);
```

### IKU Table

```sql
CREATE TABLE iku (
    id BIGSERIAL PRIMARY KEY,
    kode VARCHAR(50) UNIQUE NOT NULL,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT NULL,
    unit_kerja_id BIGINT NOT NULL REFERENCES unit_kerja(id),
    formula VARCHAR(500) NULL,
    satuan VARCHAR(50) NOT NULL,
    baseline DECIMAL(10, 2) NULL,
    target_tahunan DECIMAL(10, 2) NOT NULL,
    target_bulanan DECIMAL(10, 2) NULL,
    target_triwulan DECIMAL(10, 2) NULL,
    target_semester DECIMAL(10, 2) NULL,
    bobot INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    tahun INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_kode (kode),
    INDEX idx_unit_kerja_id (unit_kerja_id),
    INDEX idx_tahun (tahun)
);
```

### SAKIP Table

```sql
CREATE TABLE sakip (
    id BIGSERIAL PRIMARY KEY,
    unit_kerja_id BIGINT NOT NULL REFERENCES unit_kerja(id),
    tahun INT NOT NULL,
    komponen VARCHAR(100) NOT NULL,
    nilai DECIMAL(5, 2) NULL,
    bobot INT DEFAULT 0,
    persentase DECIMAL(5, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'draft',
    verifikasi_status VARCHAR(50) DEFAULT 'pending',
    approval_status VARCHAR(50) DEFAULT 'pending',
    eviden_file_id BIGINT NULL REFERENCES dokumen(id),
    catatan TEXT NULL,
    created_by BIGINT REFERENCES users(id),
    verified_by BIGINT NULL REFERENCES users(id),
    approved_by BIGINT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_unit_kerja_id (unit_kerja_id),
    INDEX idx_tahun (tahun),
    INDEX idx_status (status)
);
```

### SPIP Maturity Table

```sql
CREATE TABLE spip_maturity (
    id BIGSERIAL PRIMARY KEY,
    unit_kerja_id BIGINT NOT NULL REFERENCES unit_kerja(id),
    tahun INT NOT NULL,
    domain VARCHAR(255) NOT NULL,
    sub_domain VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    skor DECIMAL(5, 2) NOT NULL,
    target_level INT NULL,
    gap_analysis TEXT NULL,
    rekomendasi TEXT NULL,
    eviden_file_id BIGINT NULL REFERENCES dokumen(id),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_unit_kerja_id (unit_kerja_id),
    INDEX idx_tahun (tahun)
);
```

### Zona Integritas Table

```sql
CREATE TABLE zona_integritas (
    id BIGSERIAL PRIMARY KEY,
    unit_kerja_id BIGINT NOT NULL REFERENCES unit_kerja(id),
    tahun INT NOT NULL,
    area_perubahan VARCHAR(255) NOT NULL,
    nilai DECIMAL(5, 2) DEFAULT 0,
    progress INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'draft',
    checklist_items JSON NULL,
    timeline_start DATE NULL,
    timeline_end DATE NULL,
    eviden_file_id BIGINT NULL REFERENCES dokumen(id),
    catatan TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_unit_kerja_id (unit_kerja_id),
    INDEX idx_tahun (tahun)
);
```

### Dokumen Table

```sql
CREATE TABLE dokumen (
    id BIGSERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    deskripsi TEXT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size BIGINT NOT NULL,
    versi INT DEFAULT 1,
    unit_kerja_id BIGINT NULL REFERENCES unit_kerja(id),
    modul VARCHAR(100) NOT NULL,
    reference_id BIGINT NULL,
    is_approved BOOLEAN DEFAULT false,
    uploaded_by BIGINT REFERENCES users(id),
    approved_by BIGINT NULL REFERENCES users(id),
    approved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_kategori (kategori),
    INDEX idx_modul (modul),
    INDEX idx_unit_kerja_id (unit_kerja_id)
);
```

### Monitoring Table

```sql
CREATE TABLE monitoring (
    id BIGSERIAL PRIMARY KEY,
    unit_kerja_id BIGINT NOT NULL REFERENCES unit_kerja(id),
    bulan INT NOT NULL,
    tahun INT NOT NULL,
    iku_id BIGINT NOT NULL REFERENCES iku(id),
    target DECIMAL(10, 2) NOT NULL,
    realisasi DECIMAL(10, 2) DEFAULT 0,
    persentase DECIMAL(5, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'on_track',
    catatan TEXT NULL,
    updated_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_unit_kerja_id (unit_kerja_id),
    INDEX idx_iku_id (iku_id),
    INDEX idx_bulan_tahun (bulan, tahun)
);
```

### Audit Log Table

```sql
CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    module VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id BIGINT NOT NULL,
    old_values JSON NULL,
    new_values JSON NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_module (module)
);
```

## Relationships

- User → Role (Many-to-Many)
- User → Permission (Many-to-Many through Role)
- Unit Kerja → Pegawai (One-to-Many)
- Unit Kerja → RENSTRA (One-to-Many)
- Unit Kerja → IKU (One-to-Many)
- Unit Kerja → SAKIP (One-to-Many)
- Unit Kerja → Monitoring (One-to-Many)
- IKU → Monitoring (One-to-Many)
- Dokumen → Modul (through reference_id)

## Indexes Strategy

- Primary Keys: BIGSERIAL
- Foreign Keys: Indexed for joins
- Search Columns: Indexed (email, kode, nama)
- Filter Columns: Indexed (status, tahun, created_at)
- Composite Indexes: For common filter combinations

## Data Retention Policy

- Soft deletes using `deleted_at` column
- Audit logs kept for 7 years (regulatory requirement)
- Temporary files deleted after 30 days
- Session logs cleaned after 90 days
