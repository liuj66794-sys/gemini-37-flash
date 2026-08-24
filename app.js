/**
 * Gemini 3.7 Flash Showcase Interactive Application
 * Google DeepMind & 2026 Frontier Models Experience Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initSpotlightEffect();
  initThemeToggle();
  initReadingProgressBar();
  initThinkingSimulator();
  initBenchmarkCharts();
  initContextHeatmap();
  initVisionSandbox();
  initAntigravityTerminal();
  initDeveloperHub();
  initTCOCalculator();
  lucide.createIcons();
});

/* ==========================================================================
   1. Canvas Gravitational Starfield & Particle System
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 80;
  const mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.8 + 0.8;
      this.color = Math.random() > 0.5 ? '#38bdf8' : '#818cf8';
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.baseAlpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#38bdf8';
          ctx.globalAlpha = (1 - dist / 110) * 0.12;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. Spotlight Mouse Effect & Theme & Reading Progress
   ========================================================================== */
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card');
  document.addEventListener('mousemove', (e) => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  const isLight = localStorage.getItem('gemini-theme') === 'light';
  if (isLight) {
    document.body.classList.add('light-theme');
    updateThemeIcon(true);
  }

  toggleBtn.addEventListener('click', () => {
    const light = document.body.classList.toggle('light-theme');
    localStorage.setItem('gemini-theme', light ? 'light' : 'dark');
    updateThemeIcon(light);
    updateChartTheme(light);
  });
}

function updateThemeIcon(isLight) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  icon.setAttribute('data-lucide', isLight ? 'moon' : 'sun');
  lucide.createIcons();
}

function initReadingProgressBar() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / maxScroll) * 100;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });
}

/* ==========================================================================
   3. Four-Level Dynamic Thinking Simulator (`thinking_level`)
   ========================================================================== */
const thinkingData = {
  raft_concurrency: {
    title: "分布式系统: 零拷贝无锁 RingBuffer 形式化安全证明与实现",
    prompt: "设计一个基于 Rust 的极速零拷贝无锁 RingBuffer，支持多生产者多消费者（MPMC），消除 Cache-line 伪共享，并在弱内存序（x86-64 / ARMv8 Release-Acquire）下给出形式化无死锁证明。",
    levels: {
      minimal: {
        ttft: "85ms",
        thoughtTime: "0.00s (Instant Pass-through)",
        tokens: "380 Tokens (0 Thinking)",
        speed: "210 T/s",
        cost: "$0.0003",
        thoughts: [],
        solution: `// [Gemini 3.7 Flash @ MINIMAL Thinking]
use std::sync::atomic::{AtomicUsize, Ordering};
use std::cell::UnsafeCell;

pub struct RingBuffer<T, const CAP: usize> {
    head: AtomicUsize,
    tail: AtomicUsize,
    buffer: [UnsafeCell<Option<T>>; CAP],
}

impl<T, const CAP: usize> RingBuffer<T, CAP> {
    pub fn new() -> Self {
        Self {
            head: AtomicUsize::new(0),
            tail: AtomicUsize::new(0),
            buffer: std::array::from_fn(|_| UnsafeCell::new(None)),
        }
    }
    // High-speed simplified enqueue (Minimal verification)
    pub fn push(&self, item: T) -> Result<(), T> {
        let t = self.tail.load(Ordering::Relaxed);
        let h = self.head.load(Ordering::Acquire);
        if t.wrapping_sub(h) >= CAP { return Err(item); }
        unsafe { *self.buffer[t % CAP].get() = Some(item); }
        self.tail.store(t.wrapping_add(1), Ordering::Release);
        Ok(())
    }
}`
      },
      low: {
        ttft: "135ms",
        thoughtTime: "0.45s",
        tokens: "720 Tokens (240 Thinking)",
        speed: "195 T/s",
        cost: "$0.0007",
        thoughts: [
          "Step 1: 检查多核 CPU 下的 Cache-line 伪共享风险，需要对 head 和 tail 进行 #[repr(align(64))] 隔离。",
          "Step 2: 验证 Release-Acquire 内存序对单生产者多消费者的基本保护边界。"
        ],
        solution: `// [Gemini 3.7 Flash @ LOW Thinking]
use std::sync::atomic::{AtomicUsize, Ordering};
use std::cell::UnsafeCell;

#[repr(align(64))]
struct CachePadded<T>(pub T);

pub struct MpmcRingBuffer<T, const CAP: usize> {
    head: CachePadded<AtomicUsize>,
    tail: CachePadded<AtomicUsize>,
    buffer: Vec<UnsafeCell<Option<T>>>,
}

impl<T, const CAP: usize> MpmcRingBuffer<T, CAP> {
    pub fn new() -> Self {
        assert!(CAP.is_power_of_two(), "Capacity must be power of 2 for fast masking");
        let mut buf = Vec::with_capacity(CAP);
        for _ in 0..CAP { buf.push(UnsafeCell::new(None)); }
        Self {
            head: CachePadded(AtomicUsize::new(0)),
            tail: CachePadded(AtomicUsize::new(0)),
            buffer: buf,
        }
    }
    // Safe CAS-based Multi-Producer enqueue
    pub fn try_push(&self, item: T) -> Result<(), T> {
        let mut tail = self.tail.0.load(Ordering::Relaxed);
        loop {
            let head = self.head.0.load(Ordering::Acquire);
            if tail.wrapping_sub(head) >= CAP { return Err(item); }
            match self.tail.0.compare_exchange_weak(tail, tail.wrapping_add(1), Ordering::AcqRel, Ordering::Relaxed) {
                Ok(_) => {
                    unsafe { *self.buffer[tail & (CAP - 1)].get() = Some(item); }
                    return Ok(());
                }
                Err(actual) => tail = actual,
            }
        }
    }
}`
      },
      medium: {
        ttft: "290ms",
        thoughtTime: "1.80s",
        tokens: "1,850 Tokens (850 Thinking)",
        speed: "188 T/s",
        cost: "$0.0021",
        thoughts: [
          "1. 架构规划: 解决 MPMC 下的 ABA 问题与数据槽竞争冲突（Slot-level Sequence Flags）。",
          "2. 内存模型: 采用 Dmitry Vyukov 经典 Bounded MPMC Queue 算法，每个 Cell 维护独立的 sequence 计数器。",
          "3. 伪共享隔离: 读写指针与全局状态均进行 64 字节 Cache-line 对齐，消除 L1/L2 Cache 击穿。",
          "4. 异常安全性: 支持 Drop 析构安全与线程 Panic 下的数据槽回收。"
        ],
        solution: `// [Gemini 3.7 Flash @ MEDIUM Thinking - Recommended Workhorse]
use std::sync::atomic::{AtomicUsize, Ordering};
use std::cell::UnsafeCell;
use std::mem::MaybeUninit;

#[repr(align(64))]
struct Padded<T>(pub T);

struct Cell<T> {
    sequence: AtomicUsize,
    value: UnsafeCell<MaybeUninit<T>>,
}

pub struct VyukovBoundedQueue<T> {
    buffer: Box<[Cell<T>]>,
    mask: usize,
    head: Padded<AtomicUsize>,
    tail: Padded<AtomicUsize>,
}

unsafe impl<T: Send> Send for VyukovBoundedQueue<T> {}
unsafe impl<T: Send> Sync for VyukovBoundedQueue<T> {}

impl<T> VyukovBoundedQueue<T> {
    pub fn with_capacity(capacity: usize) -> Self {
        let cap = capacity.next_power_of_two();
        let mut buffer = Vec::with_capacity(cap);
        for i in 0..cap {
            buffer.push(Cell {
                sequence: AtomicUsize::new(i),
                value: UnsafeCell::new(MaybeUninit::uninit()),
            });
        }
        Self {
            buffer: buffer.into_boxed_slice(),
            mask: cap - 1,
            head: Padded(AtomicUsize::new(0)),
            tail: Padded(AtomicUsize::new(0)),
        }
    }

    pub fn push(&self, item: T) -> Result<(), T> {
        let mut pos = self.tail.0.load(Ordering::Relaxed);
        loop {
            let cell = &self.buffer[pos & self.mask];
            let seq = cell.sequence.load(Ordering::Acquire);
            let diff = (seq as isize) - (pos as isize);

            if diff == 0 {
                match self.tail.0.compare_exchange_weak(pos, pos + 1, Ordering::Relaxed, Ordering::Relaxed) {
                    Ok(_) => {
                        unsafe { (*cell.value.get()).write(item); }
                        cell.sequence.store(pos + 1, Ordering::Release);
                        return Ok(());
                    }
                    Err(actual) => pos = actual,
                }
            } else if diff < 0 {
                return Err(item); // Queue Full
            } else {
                pos = self.tail.0.load(Ordering::Relaxed);
            }
        }
    }
}`
      },
      high: {
        ttft: "620ms",
        thoughtTime: "4.85s",
        tokens: "4,680 Tokens (2,900 Deep CoT Thinking)",
        speed: "182 T/s",
        cost: "$0.0062",
        thoughts: [
          "1. 形式化内存序证明 (ARMv8 / C++20 Memory Model):",
          "   - 设 Enqueue(P) 写数据为 $W_{data}$，写 Sequence 为 $W_{seq}^{rel}$。Dequeue(C) 读 Sequence 为 $R_{seq}^{acq}$，读数据为 $R_{data}$。",
          "   - 由 C++20 标准: $W_{seq}^{rel} \\xrightarrow{\\text{synchronizes-with}} R_{seq}^{acq}$。",
          "   - 因此 $W_{data} \\xrightarrow{\\text{happens-before}} R_{data}$，严格保证无数据竞争（Data-Race Free）。",
          "2. 活锁与ABA防护分析:",
          "   - Sequence 递增步长为 1 和 `CAP`，当且仅当发生 $2^{64}$ 次入队后才产生溢出回绕，物理时间不可达，彻底免疫 ABA 缺陷。",
          "3. 现代硬件微架构优化:",
          "   - 在 CAS 冲突回退循环中插入 `std::hint::spin_loop()`，向 CPU 发送 PAUSE 指令，降低流水线刷销延迟与功耗开销。",
          "4. 形式化 TLA+ 规范与断言验证逻辑自包含。"
        ],
        solution: `// [Gemini 3.7 Flash @ HIGH Deep Thinking - Enterprise Frontier Standard]
use std::sync::atomic::{AtomicUsize, Ordering};
use std::cell::UnsafeCell;
use std::mem::MaybeUninit;

#[repr(align(64))]
struct CacheAligned<T>(pub T);

struct Slot<T> {
    sequence: AtomicUsize,
    storage: UnsafeCell<MaybeUninit<T>>,
}

/// A fully formal-verified, lock-free, zero-allocation MPMC bounded queue.
pub struct ConcurrentRingBuffer<T> {
    buffer: Box<[Slot<T>]>,
    capacity_mask: usize,
    enqueue_pos: CacheAligned<AtomicUsize>,
    dequeue_pos: CacheAligned<AtomicUsize>,
}

unsafe impl<T: Send> Send for ConcurrentRingBuffer<T> {}
unsafe impl<T: Send> Sync for ConcurrentRingBuffer<T> {}

impl<T> ConcurrentRingBuffer<T> {
    pub fn new(capacity: usize) -> Self {
        assert!(capacity >= 2 && capacity.is_power_of_two(), "Capacity must be power of 2 >= 2");
        let mut slots = Vec::with_capacity(capacity);
        for i in 0..capacity {
            slots.push(Slot {
                sequence: AtomicUsize::new(i),
                storage: UnsafeCell::new(MaybeUninit::uninit()),
            });
        }
        Self {
            buffer: slots.into_boxed_slice(),
            capacity_mask: capacity - 1,
            enqueue_pos: CacheAligned(AtomicUsize::new(0)),
            dequeue_pos: CacheAligned(AtomicUsize::new(0)),
        }
    }

    #[inline(always)]
    pub fn try_enqueue(&self, item: T) -> Result<(), T> {
        let mut pos = self.enqueue_pos.0.load(Ordering::Relaxed);
        let mut backoff_count = 0;

        loop {
            let slot = &self.buffer[pos & self.capacity_mask];
            let seq = slot.sequence.load(Ordering::Acquire);
            let diff = (seq as isize).wrapping_sub(pos as isize);

            if diff == 0 {
                match self.enqueue_pos.0.compare_exchange_weak(
                    pos, pos.wrapping_add(1), Ordering::Relaxed, Ordering::Relaxed
                ) {
                    Ok(_) => {
                        unsafe { (*slot.storage.get()).write(item); }
                        slot.sequence.store(pos.wrapping_add(1), Ordering::Release);
                        return Ok(());
                    }
                    Err(actual_pos) => {
                        pos = actual_pos;
                        backoff_count += 1;
                        if backoff_count > 4 { std::hint::spin_loop(); }
                    }
                }
            } else if diff < 0 {
                return Err(item); // Queue Full
            } else {
                pos = self.enqueue_pos.0.load(Ordering::Relaxed);
            }
        }
    }

    #[inline(always)]
    pub fn try_dequeue(&self) -> Option<T> {
        let mut pos = self.dequeue_pos.0.load(Ordering::Relaxed);
        let mut backoff_count = 0;

        loop {
            let slot = &self.buffer[pos & self.capacity_mask];
            let seq = slot.sequence.load(Ordering::Acquire);
            let diff = (seq as isize).wrapping_sub(pos.wrapping_add(1) as isize);

            if diff == 0 {
                match self.dequeue_pos.0.compare_exchange_weak(
                    pos, pos.wrapping_add(1), Ordering::Relaxed, Ordering::Relaxed
                ) {
                    Ok(_) => {
                        let val = unsafe { (*slot.storage.get()).assume_init_read() };
                        slot.sequence.store(pos.wrapping_add(self.capacity_mask).wrapping_add(1), Ordering::Release);
                        return Some(val);
                    }
                    Err(actual_pos) => {
                        pos = actual_pos;
                        backoff_count += 1;
                        if backoff_count > 4 { std::hint::spin_loop(); }
                    }
                }
            } else if diff < 0 {
                return None; // Queue Empty
            } else {
                pos = self.dequeue_pos.0.load(Ordering::Relaxed);
            }
        }
    }
}`
      }
    }
  },
  agentic_refactor: {
    title: "Agentic 软件工程: 跨 12 模块重构与 pytest 自动修复",
    prompt: "在大型 Python FastAPI + SQLModel 异步代码库中，将同步数据库 Session 全面迁移至 AsyncSession，自动处理多对多关联级联加载，并修复由此导致的所有单元测试死锁与 Broken Fixtures。",
    levels: {
      minimal: {
        ttft: "90ms",
        thoughtTime: "0.00s",
        tokens: "310 Tokens",
        speed: "205 T/s",
        cost: "$0.0002",
        thoughts: [],
        solution: `# [Gemini 3.7 Flash @ MINIMAL]
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine

async def get_async_session(engine) -> AsyncSession:
    async with AsyncSession(engine) as session:
        yield session`
      },
      low: {
        ttft: "140ms",
        thoughtTime: "0.50s",
        tokens: "650 Tokens",
        speed: "192 T/s",
        cost: "$0.0006",
        thoughts: ["分析 12 个模块中的依赖注入变更，更新 FastAPI Depends(get_session) 签名。"],
        solution: `# [Gemini 3.7 Flash @ LOW]
from typing import AsyncGenerator
from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import selectinload

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(async_engine) as session:
        yield session

@router.get("/users/{user_id}", response_model=UserReadWithTeams)
async def read_user(user_id: int, db: AsyncSession = Depends(get_session)):
    statement = select(User).where(User.id == user_id).options(selectinload(User.teams))
    result = await db.exec(statement)
    return result.one_or_none()`
      },
      medium: {
        ttft: "310ms",
        thoughtTime: "2.10s",
        tokens: "1,620 Tokens",
        speed: "185 T/s",
        cost: "$0.0019",
        thoughts: [
          "1. 依赖倒置重构: 统一改写 conftest.py 中的 pytest-asyncio fixture，采用 scope='function' 避免跨用例连接污染。",
          "2. N+1 查询消除: 自动为全量关联模型注入 `selectinload` 与 `joinedload` 预加载策略。",
          "3. 事务回滚防护: 注入 savepoint 嵌套回滚机制，确保每个测试隔离运行。"
        ],
        solution: `# [Gemini 3.7 Flash @ MEDIUM - DeepSWE v1.1 Proven Solution]
import pytest
import pytest_asyncio
from sqlmodel import SQLModel, select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import selectinload

# 1. Self-healing Conftest Fixture
@pytest_asyncio.fixture(scope="function")
async def test_session(test_engine):
    connection = await test_engine.connect()
    trans = await connection.begin()
    session_factory = async_sessionmaker(connection, class_=AsyncSession, expire_on_commit=False)
    session = session_factory()
    try:
        yield session
    finally:
        await session.close()
        await trans.rollback()
        await connection.close()

# 2. Production Async Controller with Eager Loading
@router.patch("/projects/{project_id}/members")
async def sync_project_members(
    project_id: int, 
    member_ids: list[int], 
    session: AsyncSession = Depends(get_session)
):
    stmt = select(Project).where(Project.id == project_id).options(selectinload(Project.members))
    res = await session.exec(stmt)
    project = res.one()
    
    users_stmt = select(User).where(User.id.in_(member_ids))
    users_res = await session.exec(users_stmt)
    project.members = list(users_res.all())
    
    session.add(project)
    await session.commit()
    await session.refresh(project, ["members"])
    return project`
      },
      high: {
        ttft: "650ms",
        thoughtTime: "5.20s",
        tokens: "3,890 Tokens",
        speed: "179 T/s",
        cost: "$0.0051",
        thoughts: [
          "1. 软件工程全域依赖拓扑扫描: 遍历 12 个模块与 38 个路由，发现 3 处隐式跨协程共享 Session 导致的高并发死锁。",
          "2. 动态自愈补丁: 设计全局 ContextVar 隔离上下文，保证 TaskGroup 与 BackgroundTasks 下的 AsyncSession 生命周期独立。",
          "3. 迁移自动化验证: 自动编写 pytest 压力回归用例（100 并发同时读写验证无 ConnectionPool 超时）。"
        ],
        solution: `# [Gemini 3.7 Flash @ HIGH - Complete Multi-file Autonomous Refactoring]
# -------------------------------------------------------------
# Module: app/core/database.py (Thread-safe Async Context Manager)
# -------------------------------------------------------------
from contextvars import ContextVar
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlmodel import SQLModel

_session_context: ContextVar[AsyncSession | None] = ContextVar("db_session", default=None)

class AsyncDatabaseManager:
    def __init__(self, db_url: str):
        self.engine = create_async_engine(db_url, pool_size=30, max_overflow=20, pool_pre_ping=True)
        self.factory = async_sessionmaker(self.engine, class_=AsyncSession, expire_on_commit=False)

    async def get_scoped_session(self) -> AsyncGenerator[AsyncSession, None]:
        async with self.factory() as session:
            token = _session_context.set(session)
            try:
                yield session
            except Exception:
                await session.rollback()
                raise
            finally:
                _session_context.reset(token)

# -------------------------------------------------------------
# Test Suite: tests/test_concurrency_stress.py (Auto-generated 100-worker verification)
# -------------------------------------------------------------
import asyncio

@pytest.mark.asyncio
async def test_high_concurrency_deadlock_free(client, test_session):
    async def worker(worker_id: int):
        resp = await client.patch(f"/projects/1/members", json={"member_ids": [worker_id % 5 + 1]})
        assert resp.status_code == 200

    tasks = [worker(i) for i in range(100)]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    assert not any(isinstance(r, Exception) for r in results)`
      }
    }
  },
  olympiad_math: {
    title: "数学与数论证明: 多元高阶 Diophantine 方程形式化求解",
    prompt: "证明方程 x^3 + y^3 + z^3 = k 在 k=33 时的所有整数解存在性，并给出基于三次拟模变换与 p-adic 分支过滤的严密计算推导。",
    levels: {
      minimal: {
        ttft: "80ms",
        thoughtTime: "0.00s",
        tokens: "240 Tokens",
        speed: "215 T/s",
        cost: "$0.0002",
        thoughts: [],
        solution: `对于 k = 33，已知 Andrew Booker 于 2019 年通过布尔网格筛法计算求得解：
x = 8,866,128,975,287,528
y = -8,778,405,442,862,239
z = -2,736,111,468,807,040
满足 x^3 + y^3 + z^3 = 33。`
      },
      low: {
        ttft: "130ms",
        thoughtTime: "0.40s",
        tokens: "580 Tokens",
        speed: "198 T/s",
        cost: "$0.0005",
        thoughts: ["运用同余分析，检查模 9 条件：x^3 = 0, +-1 (mod 9)，因此 k 模 9 不能同余于 4 或 5。33 = 6 (mod 9) 满足条件。"],
        solution: `**同余可行性证明**:
若整数 x，则 x^3 ≡ 0, 1, 8 (mod 9)。
3 个立方数之和在 mod 9 下只能取 {0, 1, 2, 3, 6, 7, 8}，不可取 4 或 5。
对于 k = 33 ≡ 6 (mod 9)，在同余阶上无阻碍。
代入 Booker 解验证：
x + y + z ≡ 0 (mod 3)
立方和恒等式完全成立。`
      },
      medium: {
        ttft: "300ms",
        thoughtTime: "1.95s",
        tokens: "1,450 Tokens",
        speed: "186 T/s",
        cost: "$0.0017",
        thoughts: [
          "1. 转化几何曲线: 设 d = x + y，则 x^3 + y^3 = d(x^2 - xy + y^2) = d((d - y)^2 - (d - y)y + y^2) = d(3y^2 - 3dy + d^2)。",
          "2. 降维二元二次型: 3y^2 - 3dy + d^2 = (33 - z^3) / d。因此必须有 d | (33 - z^3)。",
          "3. 判别式约束: Delta = 9d^2 - 12(d^2 - (33 - z^3)/d) = 12(33 - z^3)/d - 3d^2 >= 0，从而约束了 z 与 d 的搜索界。"
        ],
        solution: `**基于代数分解的算法化证明**:
设 $d = x + y$，代入 $x^3 + y^3 + z^3 = 33$：
$$d \\cdot (3y^2 - 3dy + d^2) = 33 - z^3$$

要使 $y$ 存在实数解，判别式 $\\Delta$ 必须非负且为有理完全平方数：
$$\\Delta = 12 \\frac{33 - z^3}{d} - 3d^2 = 3 \\left( 4\\frac{33 - z^3}{d} - d^2 \\right) \\ge 0$$
$$\\implies d \\le \\sqrt[3]{4(33 - z^3)}$$

结合 $p$-adic 赋值分析，对于素因子 $p | d$ 且 $p \\equiv 2 \\pmod 3$，必须满足二次剩余限制，极大地将搜索复杂度由 $O(N^2)$ 压缩至 $O(N \\log N)$。`
      },
      high: {
        ttft: "680ms",
        thoughtTime: "5.80s",
        tokens: "4,200 Tokens",
        speed: "176 T/s",
        cost: "$0.0058",
        thoughts: [
          "1. 严密数论映射: 引入分圆域 $\\mathbb{Q}(\\zeta_3)$，其中 $\\zeta_3 = e^{2\\pi i / 3}$。在代数整数环 $\\mathbb{Z}[\\zeta_3]$（艾森斯坦整数环）中进行主理想分解。",
          "2. 范数方程构造: $x^3 + y^3 = N(x + y\\zeta_3) \\cdot (x + y)$，将寻找 Diophantine 解转化为在复环上寻找具有指定范数的代数整元。",
          "3. 形式化 Python 验证代码自动生成与沙盒执行，确认解的超大数精度无溢出。"
        ],
        solution: `**形式化代数数论证明与 Python 符号检验**:

在艾森斯坦整数环 $\\mathcal{O}_K = \\mathbb{Z}[\\omega]$（其中 $\\omega = \\frac{-1 + \\sqrt{-3}}{2}$）中，有分解：
$$x^3 + y^3 = (x + y)(x + \\omega y)(x + \\omega^2 y) = 33 - z^3$$

定义域范数映射 $N_{K/\\mathbb{Q}}(\\alpha) = \\alpha \\bar{\\alpha}$，任何有效整解必对应 $\\mathcal{O}_K$ 中的素理想因子积。

\`\`\`python
# [Python Visual Code Exec 形式化验证]
x = 8866128975287528
y = -8778405442862239
z = -2736111468807040

lhs = x**3 + y**3 + z**3
assert lhs == 33, f"Verification failed: {lhs}"
print(f"Verified! x^3 + y^3 + z^3 = {lhs} (Identical to 33)")
\`\`\`
**结论**: 经严格代数数论分解与 Python 沙盒计算内核验证，解满足全部约束条件。`
      }
    }
  },
  vision_financial: {
    title: "跨模态视觉代码验算: 复杂财报曲线拐点与复合增长率量化",
    prompt: "输入一张包含噪声与多折线的非线性营收趋势图，利用内置 Python 沙盒进行像素坐标反算与拟合，精确推导 Q3 拐点发生时刻与 YoY 复合增速。",
    levels: {
      minimal: {
        ttft: "95ms",
        thoughtTime: "0.00s",
        tokens: "280 Tokens",
        speed: "200 T/s",
        cost: "$0.0003",
        thoughts: [],
        solution: `根据图表视觉观察：
Q3 拐点约出现在 8 月中旬，预计 YoY 增速约为 34.5%。`
      },
      low: {
        ttft: "145ms",
        thoughtTime: "0.45s",
        tokens: "520 Tokens",
        speed: "190 T/s",
        cost: "$0.0005",
        thoughts: ["提取图表 Y 轴标尺范围（$0M - $120M）与 X 轴时间刻度。"],
        solution: `**图表结构化提取**:
- 基准标尺: Y 轴区间 [$0M, $120M], X 轴刻度 [Jan 2026 - Dec 2026]
- 关键转折点: 位于第 8 个月标记处（Aug 2026）
- 估算营收: 从 $42.5M 跃升至 $78.2M，估算 CAGR 达到 36.2%。`
      },
      medium: {
        ttft: "320ms",
        thoughtTime: "2.30s",
        tokens: "1,580 Tokens",
        speed: "184 T/s",
        cost: "$0.0018",
        thoughts: [
          "1. 视觉坐标对齐: 识别图表四角锚点像素坐标 [(120, 80), (840, 560)]。",
          "2. 曲线二阶导数分析: 寻找曲率最大点 (d²y/dx² = 0)，消除肉眼估算偏差。",
          "3. 自动生成并执行 Python 拟合脚本。"
        ],
        solution: `# [Gemini 3.7 Flash Visual Code Execution]
import numpy as np
from scipy.interpolate import UnivariateSpline

# 像素逆映射坐标点
x_months = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
y_rev = np.array([24.2, 26.1, 28.5, 31.0, 35.8, 42.1, 51.4, 68.9, 85.2, 98.6, 108.2, 116.5])

# 三次样条插值求导
spline = UnivariateSpline(x_months, y_rev, s=0.5)
d2_spline = spline.derivative(n=2)
roots = d2_spline.roots() # 找到最大曲率拐点

inflection_month = roots[0] # 输出 7.82 (即 8 月 25 日)
print(f"精确拐点日期: 2026-08-25, YoY 实际增速: 38.64%")`
      },
      high: {
        ttft: "670ms",
        thoughtTime: "5.40s",
        tokens: "3,950 Tokens",
        speed: "177 T/s",
        cost: "$0.0054",
        thoughts: [
          "1. 视觉幻觉防御协议 (Visual Hallucination Defense): 调用内置 Python 代码沙盒，使用 OpenCV 与色度直方图分割图表折线像素通道。",
          "2. 蒙特卡洛置信区间拟合: 针对图表上的印刷模糊建立高斯误差模型（sigma=1.2px）。",
          "3. 交叉核验财务公式: 自动结合表格中脚注提及的汇率波动与会计准则变更，修正名义增速与实际增速。"
        ],
        solution: `# [Gemini 3.7 Flash @ HIGH - Zero-Hallucination Visual Code Execution]
import cv2
import numpy as np
import pandas as pd

# 1. 颜色掩膜与像素级折线提取
img = cv2.imread("uploaded_chart.png")
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
blue_mask = cv2.inRange(hsv, (100, 150, 50), (140, 255, 255))
pts = np.column_stack(np.where(blue_mask > 0))

# 2. 仿射变换逆矩阵映射回实际业务坐标系
origin_px, max_x_px, max_y_px = (145, 520), (890, 520), (145, 110)
x_val = (pts[:, 1] - origin_px[0]) / (max_x_px[0] - origin_px[0]) * 12.0
y_val = (origin_px[1] - pts[:, 0]) / (origin_px[1] - max_y_px[1]) * 120.0

# 3. 统计学稳健回归 (Theil-Sen Estimator)
from sklearn.linear_model import TheilSenRegressor
model = TheilSenRegressor().fit(x_val.reshape(-1, 1), y_val)

# [验证结论输出]
# - Q3 拐点确切时刻: 2026年8月22日 14:00 (置信度 99.4%)
# - 拐点处瞬间年化加速度: +$16.42M/Month²
# - 剔除汇率影响后实际 YoY 增速: 39.12% (完全消除视觉读数幻觉)`
      }
    }
  }
};

let currentScenario = 'raft_concurrency';
let currentLevel = 'medium';

function initThinkingSimulator() {
  const scenarioBtns = document.querySelectorAll('.sim-scenario-btn');
  const levelBtns = document.querySelectorAll('.sim-level-btn');

  scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scenarioBtns.forEach(b => b.classList.remove('tab-active', 'border-sky-500', 'text-sky-400'));
      btn.classList.add('tab-active');
      currentScenario = btn.dataset.scenario;
      updateSimulatorUI();
    });
  });

  levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      levelBtns.forEach(b => b.classList.remove('bg-sky-500/20', 'border-sky-500', 'text-sky-400'));
      btn.classList.add('bg-sky-500/20', 'border-sky-500', 'text-sky-400');
      currentLevel = btn.dataset.level;
      updateSimulatorUI();
    });
  });

  const toggleThoughtsBtn = document.getElementById('toggle-thoughts-btn');
  const thoughtsContainer = document.getElementById('simulator-thoughts-container');
  if (toggleThoughtsBtn && thoughtsContainer) {
    toggleThoughtsBtn.addEventListener('click', () => {
      const isHidden = thoughtsContainer.classList.contains('hidden');
      if (isHidden) {
        thoughtsContainer.classList.remove('hidden');
        toggleThoughtsBtn.innerHTML = `<i data-lucide="chevron-up" class="w-4 h-4 mr-1 inline"></i> 折叠思考过程`;
      } else {
        thoughtsContainer.classList.add('hidden');
        toggleThoughtsBtn.innerHTML = `<i data-lucide="chevron-down" class="w-4 h-4 mr-1 inline"></i> 展开思考过程`;
      }
      lucide.createIcons();
    });
  }

  updateSimulatorUI();
}

function updateSimulatorUI() {
  const scenario = thinkingData[currentScenario];
  if (!scenario) return;
  const levelData = scenario.levels[currentLevel];
  if (!levelData) return;

  document.getElementById('sim-prompt-display').innerText = scenario.prompt;
  document.getElementById('sim-metric-ttft').innerText = levelData.ttft;
  document.getElementById('sim-metric-thought-time').innerText = levelData.thoughtTime;
  document.getElementById('sim-metric-tokens').innerText = levelData.tokens;
  document.getElementById('sim-metric-speed').innerText = levelData.speed;
  document.getElementById('sim-metric-cost').innerText = levelData.cost;

  // Render Thought Process
  const thoughtList = document.getElementById('sim-thought-list');
  const thoughtCountBadge = document.getElementById('sim-thought-count');
  thoughtList.innerHTML = '';

  if (levelData.thoughts.length === 0) {
    thoughtCountBadge.innerText = '0 节点 (即时直出)';
    thoughtList.innerHTML = `<div class="text-slate-400 italic text-sm py-2">MINIMAL 模式下跳过隐式思考阶段，以 < 100ms 速度瞬时返回解答。</div>`;
  } else {
    thoughtCountBadge.innerText = `${levelData.thoughts.length} 个推演节点`;
    levelData.thoughts.forEach((t, idx) => {
      const item = document.createElement('div');
      item.className = 'thinking-bubble p-3 rounded-lg text-xs md:text-sm text-slate-300 mb-2.5 font-mono';
      item.innerText = t;
      thoughtList.appendChild(item);
    });
  }

  // Render Solution
  document.getElementById('sim-code-solution').innerText = levelData.solution;
  lucide.createIcons();
}

/* ==========================================================================
   4. 2026 Multi-Model Benchmark Chart System (Chart.js)
   ========================================================================== */
let benchmarkRadarChart, benchmarkBarChart, benchmarkScatterChart;

const benchmarkDatasets = {
  models: {
    'gemini-37-flash': {
      label: 'Gemini 3.7 Flash (High)',
      color: '#38bdf8',
      bgColor: 'rgba(56, 189, 248, 0.25)',
      radar: [92, 88, 91, 89, 90, 98], // Coding, Reasoning, Math, GUI Agent, Multimodal, Cost-Efficiency
      bars: [65.3, 47.9, 43.6, 30.4, 34.0], // DeepSWE, OSWorld, FrontierCode, AutomationBench, GDP.pdf
      price: 0.75,
      score: 65.3,
      checked: true
    },
    'gemini-36-flash': {
      label: 'Gemini 3.6 Flash (Predecessor)',
      color: '#94a3b8',
      bgColor: 'rgba(148, 163, 184, 0.2)',
      radar: [78, 74, 76, 70, 80, 94],
      bars: [49.0, 33.7, 34.4, 17.0, 22.0],
      price: 1.50,
      score: 49.0,
      checked: true
    },
    'claude-opus-5': {
      label: 'Claude Opus 5',
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.2)',
      radar: [96, 94, 93, 91, 92, 60],
      bars: [74.0, 49.5, 47.2, 33.5, 36.2],
      price: 7.50,
      score: 74.0,
      checked: true
    },
    'claude-fable-5': {
      label: 'Claude Fable 5 (Mythos)',
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.2)',
      radar: [94, 96, 95, 94, 93, 35],
      bars: [70.0, 52.0, 48.5, 32.8, 35.8],
      price: 15.00,
      score: 70.0,
      checked: false
    },
    'gpt-56-sol': {
      label: 'GPT-5.6 Sol',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.2)',
      radar: [95, 95, 94, 93, 91, 45],
      bars: [73.0, 51.2, 46.5, 34.0, 35.0],
      price: 10.00,
      score: 73.0,
      checked: true
    },
    'gpt-56-terra': {
      label: 'GPT-5.6 Terra',
      color: '#eab308',
      bgColor: 'rgba(234, 179, 8, 0.2)',
      radar: [82, 80, 81, 78, 82, 75],
      bars: [58.2, 39.8, 38.0, 25.6, 27.5],
      price: 3.00,
      score: 58.2,
      checked: true
    }
  }
};

function initBenchmarkCharts() {
  const radarCtx = document.getElementById('benchmark-radar-chart');
  const barCtx = document.getElementById('benchmark-bar-chart');
  const scatterCtx = document.getElementById('benchmark-scatter-chart');
  if (!radarCtx || !barCtx || !scatterCtx) return;

  const isLight = document.body.classList.contains('light-theme');
  const gridColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLight ? '#475569' : '#94a3b8';

  // 1. Radar Chart
  benchmarkRadarChart = new Chart(radarCtx, {
    type: 'radar',
    data: getRadarChartData(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: { color: gridColor },
          angleLines: { color: gridColor },
          pointLabels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' } },
          ticks: { display: false, max: 100, min: 20 }
        }
      },
      plugins: {
        legend: { position: 'bottom', labels: { color: textColor, boxWidth: 12, font: { family: 'Plus Jakarta Sans' } } }
      }
    }
  });

  // 2. Bar Chart
  benchmarkBarChart = new Chart(barCtx, {
    type: 'bar',
    data: getBarChartData(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', weight: '600' } }
        },
        y: {
          grid: { color: gridColor },
          ticks: { color: textColor, callback: v => `${v}%` },
          max: 85
        }
      },
      plugins: {
        legend: { position: 'bottom', labels: { color: textColor, boxWidth: 12 } },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}%`
          }
        }
      }
    }
  });

  // 3. Scatter Chart
  benchmarkScatterChart = new Chart(scatterCtx, {
    type: 'scatter',
    data: getScatterChartData(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'logarithmic',
          title: { display: true, text: '调用成本 ($ / 1M Input Tokens, 对数坐标)', color: textColor },
          grid: { color: gridColor },
          ticks: { color: textColor, callback: v => `$${v}` },
          min: 0.5,
          max: 20
        },
        y: {
          title: { display: true, text: 'DeepSWE v1.1 软件工程准确率 (%)', color: textColor },
          grid: { color: gridColor },
          ticks: { color: textColor, callback: v => `${v}%` },
          min: 40,
          max: 80
        }
      },
      plugins: {
        legend: { position: 'bottom', labels: { color: textColor, boxWidth: 12 } },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.dataset.label} -> 成本: $${ctx.raw.x}/1M, DeepSWE: ${ctx.raw.y}%`
          }
        }
      }
    }
  });

  // Checkbox Event Listeners
  document.querySelectorAll('.model-filter-checkbox').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const modelKey = e.target.dataset.model;
      if (benchmarkDatasets.models[modelKey]) {
        benchmarkDatasets.models[modelKey].checked = e.target.checked;
        updateCharts();
      }
    });
  });

  // Chart Tab switcher
  const chartTabBtns = document.querySelectorAll('.chart-view-btn');
  const chartViews = document.querySelectorAll('.chart-view-panel');
  chartTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chartTabBtns.forEach(b => b.classList.remove('tab-active'));
      btn.classList.add('tab-active');
      const view = btn.dataset.view;
      chartViews.forEach(cv => cv.classList.add('hidden'));
      document.getElementById(`chart-panel-${view}`).classList.remove('hidden');
    });
  });
}

function getRadarChartData() {
  const datasets = [];
  Object.keys(benchmarkDatasets.models).forEach(key => {
    const m = benchmarkDatasets.models[key];
    if (m.checked) {
      datasets.push({
        label: m.label,
        data: m.radar,
        borderColor: m.color,
        backgroundColor: m.bgColor,
        borderWidth: key === 'gemini-37-flash' ? 3 : 1.5,
        pointBackgroundColor: m.color
      });
    }
  });
  return {
    labels: ['Agent 编程', '复杂系统推理', '高等数论证明', 'GUI 操作系统', '超长多模态', '性价比与吞吐'],
    datasets
  };
}

function getBarChartData() {
  const datasets = [];
  Object.keys(benchmarkDatasets.models).forEach(key => {
    const m = benchmarkDatasets.models[key];
    if (m.checked) {
      datasets.push({
        label: m.label,
        data: m.bars,
        backgroundColor: m.color,
        borderRadius: 6
      });
    }
  });
  return {
    labels: ['DeepSWE v1.1', 'OSWorld 2.0', 'FrontierCode 1.1', 'AutomationBench', 'GDP.pdf (1M)'],
    datasets
  };
}

function getScatterChartData() {
  const datasets = [];
  Object.keys(benchmarkDatasets.models).forEach(key => {
    const m = benchmarkDatasets.models[key];
    if (m.checked) {
      datasets.push({
        label: m.label,
        data: [{ x: m.price, y: m.score }],
        backgroundColor: m.color,
        borderColor: m.color,
        pointRadius: key === 'gemini-37-flash' ? 10 : 7,
        pointHoverRadius: key === 'gemini-37-flash' ? 14 : 10
      });
    }
  });
  return { datasets };
}

function updateCharts() {
  if (benchmarkRadarChart) {
    benchmarkRadarChart.data = getRadarChartData();
    benchmarkRadarChart.update();
  }
  if (benchmarkBarChart) {
    benchmarkBarChart.data = getBarChartData();
    benchmarkBarChart.update();
  }
  if (benchmarkScatterChart) {
    benchmarkScatterChart.data = getScatterChartData();
    benchmarkScatterChart.update();
  }
}

function updateChartTheme(isLight) {
  const gridColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLight ? '#475569' : '#94a3b8';

  [benchmarkRadarChart, benchmarkBarChart, benchmarkScatterChart].forEach(chart => {
    if (!chart) return;
    if (chart.options.scales.r) {
      chart.options.scales.r.grid.color = gridColor;
      chart.options.scales.r.angleLines.color = gridColor;
      chart.options.scales.r.pointLabels.color = textColor;
    }
    if (chart.options.scales.x) {
      chart.options.scales.x.grid.color = gridColor;
      chart.options.scales.x.ticks.color = textColor;
      if (chart.options.scales.x.title) chart.options.scales.x.title.color = textColor;
    }
    if (chart.options.scales.y) {
      chart.options.scales.y.grid.color = gridColor;
      chart.options.scales.y.ticks.color = textColor;
      if (chart.options.scales.y.title) chart.options.scales.y.title.color = textColor;
    }
    chart.options.plugins.legend.labels.color = textColor;
    chart.update();
  });
}

/* ==========================================================================
   5. 1M Context Haystack Heatmap
   ========================================================================== */
function initContextHeatmap() {
  const grid = document.getElementById('heatmap-grid');
  const detailsEl = document.getElementById('heatmap-probe-details');
  if (!grid || !detailsEl) return;

  const totalCells = 100;
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'heatmap-cell aspect-square rounded-sm bg-sky-500/80 border border-sky-400/40 hover:bg-emerald-400 transition-all';
    const tokenDepth = (i + 1) * 10000;
    cell.dataset.depth = `${(tokenDepth / 10000).toFixed(0)}% (${tokenDepth.toLocaleString()} Tokens)`;

    cell.addEventListener('click', () => {
      document.querySelectorAll('.heatmap-cell').forEach(c => c.classList.remove('ring-2', 'ring-emerald-400', 'bg-emerald-400'));
      cell.classList.add('ring-2', 'ring-emerald-400', 'bg-emerald-400');
      detailsEl.innerHTML = `
        <div class="space-y-2 font-mono text-xs">
          <div class="flex justify-between border-b border-white/10 pb-1">
            <span class="text-slate-400">探针插入深度:</span>
            <span class="text-sky-400 font-bold">${cell.dataset.depth}</span>
          </div>
          <div class="flex justify-between border-b border-white/10 pb-1">
            <span class="text-slate-400">Needle 检索召回率:</span>
            <span class="text-emerald-400 font-bold">99.98% (Perfect Recall)</span>
          </div>
          <div class="flex justify-between border-b border-white/10 pb-1">
            <span class="text-slate-400">首字注意力命中延迟:</span>
            <span class="text-purple-400 font-bold">14.2ms (KV Cache Caching)</span>
          </div>
          <div class="text-slate-300 text-xs italic mt-2">
            "检索事实: 节点 ID #7401-Delta 位于第 ${tokenDepth.toLocaleString()} Token 处，在 1M 上下文全窗口内保持无损注意力保真度。"
          </div>
        </div>
      `;
    });
    grid.appendChild(cell);
  }
}

/* ==========================================================================
   6. Visual Code Execution Sandbox
   ========================================================================== */
const visionTasks = {
  finance: {
    title: "高频交易走势图：拐点与非线性二阶导数精确拟合",
    imageDesc: "带严重噪点与多周期波动的 Q3 科技股指数分时折线图",
    code: `import cv2
import numpy as np
from scipy.signal import find_peaks

# 1. 内置 Python 沙盒提取折线像素
img = cv2.imread("market_chart_q3.png")
mask = cv2.inRange(img, (200, 50, 0), (255, 120, 50))
y_indices, x_indices = np.where(mask > 0)

# 2. 局部极值与拐点推导
peaks, properties = find_peaks(y_indices, prominence=25)
inflection_x = x_indices[peaks[0]] / img.shape[1] * 100 # 转化为时间轴刻度

print(f"[Sandbox] 关键突破拐点坐标: T={inflection_x:.2f}% | 强度={properties['prominences'][0]:.1f}")`,
    output: `[Python 3.12 Kernel Finished in 28ms]
>>> 精确拐点定位: 2026-08-18 14:32:05 EST
>>> 拟合置信度: 99.7%
>>> 零视觉幻觉校验: 成功排除第 4 周期图像渲染噪点干扰`
  },
  cad: {
    title: "航空级复杂零件 CAD 几何公差与倒角半径反求",
    imageDesc: "包含三维正交投影图纸与密集标注尺寸的航空涡轮截面工程蓝图",
    code: `import sympy as sp
import math

# 形式化求解倒角外接圆弧半径 R
theta = sp.Symbol('theta', positive=True)
R = sp.Symbol('R', positive=True)

# 根据图纸基准线构建几何约束方程
eq1 = sp.Eq(R * (1 - sp.cos(theta)), 3.450)
eq2 = sp.Eq(R * sp.sin(theta) + 12.80, 18.25)
sol = sp.nsolve((eq1, eq2), (R, theta), (15.0, 0.45))

print(f"[Sandbox] 倒角圆弧半径 R = {float(sol[0]):.4f} mm, 接触角 = {math.degrees(float(sol[1])):.2f}°")`,
    output: `[Python 3.12 Kernel Finished in 34ms]
>>> 倒角半径 R = 15.4218 mm (公差 ±0.002 mm)
>>> 接触角 = 24.85°
>>> 零几何误差: 与原始 CAD STEP 实体模型完全一致`
  }
};

function initVisionSandbox() {
  const btns = document.querySelectorAll('.vision-task-btn');
  const codeEl = document.getElementById('vision-sandbox-code');
  const outEl = document.getElementById('vision-sandbox-output');
  const titleEl = document.getElementById('vision-task-title');
  if (!codeEl || !outEl || !titleEl) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('tab-active'));
      btn.classList.add('tab-active');
      const task = visionTasks[btn.dataset.task];
      if (task) {
        titleEl.innerText = task.title;
        codeEl.innerText = task.code;
        outEl.innerText = task.output;
      }
    });
  });
}

/* ==========================================================================
   7. Google Antigravity Agent Interactive Terminal Simulator
   ========================================================================== */
const terminalSteps = [
  { text: "$ antigravity run --model gemini-3.7-flash --task 'Fix distributed deadlock in cluster/raft.rs'", delay: 300, color: 'text-sky-400' },
  { text: "⚡ [Antigravity Agent] Connecting to Linux Sandbox (Workspace: /sandbox/raft-core)...", delay: 400, color: 'text-slate-400' },
  { text: "🔍 Scanning repository AST... Indexed 18 Rust source files (24,800 LOC).", delay: 500, color: 'text-slate-300' },
  { text: "⚠️ Deadlock identified at src/cluster/raft.rs:L142:", delay: 600, color: 'text-amber-400' },
  { text: "   Mutex lock order violation between `StateLock` and `LogSegmentLock` during snapshot append.", delay: 400, color: 'text-slate-400' },
  { text: "🛠️ [Gemini 3.7 Flash @ HIGH] Synthesizing atomic lockless CAS state machine patch...", delay: 700, color: 'text-purple-400' },
  { text: "📝 Applied diff to 3 files: [src/cluster/raft.rs, src/cluster/state.rs, tests/deadlock_test.rs]", delay: 500, color: 'text-emerald-400' },
  { text: "🚀 Running test suite: `cargo test --release -- --nocapture`...", delay: 600, color: 'text-slate-300' },
  { text: "   running 52 tests", delay: 300, color: 'text-slate-400' },
  { text: "   test cluster::tests::test_election ... ok", delay: 200, color: 'text-slate-400' },
  { text: "   test cluster::tests::test_concurrent_deadlock_1000_iters ... ok (0.42s)", delay: 300, color: 'text-emerald-400 font-bold' },
  { text: "   test cluster::tests::test_snapshot_recovery ... ok", delay: 200, color: 'text-slate-400' },
  { text: "✅ Test result: ok. 52 passed; 0 failed; 0 ignored; finished in 1.84s", delay: 400, color: 'text-emerald-400 font-bold' },
  { text: "🎉 [Antigravity] PR #104 'fix(raft): lockless snapshot synchronization' generated & ready for merge.", delay: 500, color: 'text-sky-300 font-bold' }
];

let terminalIndex = 0;
let terminalTimer = null;
let isTerminalPlaying = false;

function initAntigravityTerminal() {
  const runBtn = document.getElementById('term-run-btn');
  const pauseBtn = document.getElementById('term-pause-btn');
  const resetBtn = document.getElementById('term-reset-btn');
  const container = document.getElementById('terminal-content');
  if (!runBtn || !container) return;

  function runNextStep() {
    if (terminalIndex >= terminalSteps.length) {
      isTerminalPlaying = false;
      return;
    }
    const step = terminalSteps[terminalIndex];
    const line = document.createElement('div');
    line.className = `${step.color} py-0.5 text-xs md:text-sm font-mono`;
    line.innerText = step.text;
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;
    terminalIndex++;

    if (isTerminalPlaying) {
      terminalTimer = setTimeout(runNextStep, step.delay);
    }
  }

  runBtn.addEventListener('click', () => {
    if (!isTerminalPlaying) {
      isTerminalPlaying = true;
      runNextStep();
    }
  });

  pauseBtn.addEventListener('click', () => {
    isTerminalPlaying = false;
    clearTimeout(terminalTimer);
  });

  resetBtn.addEventListener('click', () => {
    isTerminalPlaying = false;
    clearTimeout(terminalTimer);
    terminalIndex = 0;
    container.innerHTML = '';
    const initialLine = document.createElement('div');
    initialLine.className = 'text-slate-400 italic text-xs';
    initialLine.innerText = '点击 [▶ 开始模拟] 观察 Antigravity 智能体在 Linux 沙箱中自主排障与 pytest 自愈流程...';
    container.appendChild(initialLine);
  });
}

/* ==========================================================================
   8. Developer Hub & Multi-Language SDK Code Generator
   ========================================================================== */
const sdkSnippets = {
  python: level => `from google import genai
from google.genai import types

client = genai.Client()

# Initialize Gemini 3.7 Flash with customizable Thinking Level
response = client.models.generate_content(
    model="gemini-3.7-flash",
    contents="Design a distributed consensus mechanism in Rust",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(
            thinking_level="${level.toUpperCase()}"  # Options: "MINIMAL", "LOW", "MEDIUM", "HIGH"
        ),
        temperature=0.7,
        max_output_tokens=64000,
    )
)

print(response.text)`,
  typescript: level => `import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.7-flash",
    contents: "Design a distributed consensus mechanism in Rust",
    config: {
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.${level.toUpperCase()}, // MINIMAL, LOW, MEDIUM, HIGH
      },
      maxOutputTokens: 64000,
    },
  });

  console.log(response.text);
}

main();`,
  curl: level => `curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent" \\
  -H "x-goog-api-key: $GEMINI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{"parts": [{"text": "Design a distributed consensus mechanism in Rust"}]}],
    "generationConfig": {
      "thinkingConfig": {
        "thinkingLevel": "${level.toUpperCase()}"
      },
      "maxOutputTokens": 64000
    }
  }'`,
  go: level => `package main

import (
	"context"
	"fmt"
	"os"

	"google.golang.org/genai"
)

func main() {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey: os.Getenv("GEMINI_API_KEY"),
	})
	if err != nil {
		panic(err)
	}

	resp, err := client.Models.GenerateContent(ctx, "gemini-3.7-flash", genai.Text("Design consensus"), &genai.GenerateContentConfig{
		ThinkingConfig: &genai.ThinkingConfig{
			ThinkingLevel: "${level.toUpperCase()}",
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(resp.Text())
}`
};

let currentSdkLang = 'python';
let currentSdkLevel = 'medium';

function initDeveloperHub() {
  const langBtns = document.querySelectorAll('.sdk-lang-btn');
  const levelSelect = document.getElementById('sdk-level-select');
  const codeBlock = document.getElementById('sdk-code-display');
  const copyBtn = document.getElementById('sdk-copy-btn');
  if (!codeBlock) return;

  function updateSdkCode() {
    const generator = sdkSnippets[currentSdkLang];
    if (generator) {
      codeBlock.innerText = generator(currentSdkLevel);
    }
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('tab-active'));
      btn.classList.add('tab-active');
      currentSdkLang = btn.dataset.lang;
      updateSdkCode();
    });
  });

  if (levelSelect) {
    levelSelect.addEventListener('change', (e) => {
      currentSdkLevel = e.target.value;
      updateSdkCode();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeBlock.innerText).then(() => {
        copyBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400 inline mr-1"></i> 已复制`;
        lucide.createIcons();
        setTimeout(() => {
          copyBtn.innerHTML = `<i data-lucide="copy" class="w-4 h-4 inline mr-1"></i> 复制代码`;
          lucide.createIcons();
        }, 2000);
      });
    });
  }

  updateSdkCode();
}

/* ==========================================================================
   9. Enterprise TCO Cost & ROI Calculator
   ========================================================================== */
function initTCOCalculator() {
  const inputSlider = document.getElementById('tco-input-slider');
  const outputSlider = document.getElementById('tco-output-slider');
  if (!inputSlider || !outputSlider) return;

  function calculateTCO() {
    const inputM = parseFloat(inputSlider.value); // In Millions
    const outputM = parseFloat(outputSlider.value); // In Millions

    document.getElementById('tco-input-val').innerText = `${inputM >= 1000 ? (inputM / 1000).toFixed(1) + 'B' : inputM + 'M'}`;
    document.getElementById('tco-output-val').innerText = `${outputM >= 1000 ? (outputM / 1000).toFixed(1) + 'B' : outputM + 'M'}`;

    // Pricing ($ / 1M tokens)
    // Gemini 3.7 Flash: $0.75 / $3.75
    // GPT-5.6 Sol: $10.00 / $50.00
    // Claude Opus 5: $7.50 / $37.50
    // Claude Fable 5: $15.00 / $75.00
    // GPT-5.6 Terra: $3.00 / $15.00

    const geminiMonthly = (inputM * 0.75) + (outputM * 3.75);
    const solMonthly = (inputM * 10.00) + (outputM * 50.00);
    const opusMonthly = (inputM * 7.50) + (outputM * 37.50);
    const fableMonthly = (inputM * 15.00) + (outputM * 75.00);
    const terraMonthly = (inputM * 3.00) + (outputM * 15.00);

    document.getElementById('cost-gemini-37').innerText = `$${geminiMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    document.getElementById('cost-gpt56-sol').innerText = `$${solMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    document.getElementById('cost-claude-opus').innerText = `$${opusMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    document.getElementById('cost-claude-fable').innerText = `$${fableMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    document.getElementById('cost-gpt56-terra').innerText = `$${terraMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

    const yearlySavings = (solMonthly - geminiMonthly) * 12;
    const savePercent = ((1 - (geminiMonthly / solMonthly)) * 100).toFixed(0);

    document.getElementById('tco-annual-savings').innerText = `$${yearlySavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    document.getElementById('tco-save-percent').innerText = `-${savePercent}%`;
  }

  inputSlider.addEventListener('input', calculateTCO);
  outputSlider.addEventListener('input', calculateTCO);
  calculateTCO();
}
